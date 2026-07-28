using Microsoft.Win32.SafeHandles;
using System.Threading;
using Microsoft.EntityFrameworkCore;
using ruut.application.DTO.Auth;
using ruut.application.Interfaces.Services;
using ruut.application.Interfaces.Security;
using ruut.domain.Entities;
using ruut.infrastructure.Persistence;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Builder;
using System.Security.Cryptography.X509Certificates;
using System.Reflection.Metadata.Ecma335;

namespace ruut.infrastructure.Services;

public class AuthService : IAuthService
{
    private readonly AppDbContext _context;
    private readonly IJwtProvider _jwtprovider;

    public AuthService(AppDbContext context, IJwtProvider jwtProvider)
    {
        _context = context;
        _jwtprovider = jwtProvider;
    }
    public async Task<AuthResponseDto> RegisterAsync(RegisterRequestDto request, CancellationToken cancellationToken = default)
    {
        var emailExists = await _context.Users
            .AnyAsync(u => u.Email == request.Email.ToLowerInvariant(), cancellationToken);
        if (emailExists)
        {
            throw new InvalidOperationException("User with this email is already exists.");
        }
        var passwordHash = BCrypt.Net.BCrypt.HashPassword(request.Password);

        var user = new User
        {
            Name = request.Name,
            LastName = request.LastName,
            Email = request.Email.ToLowerInvariant(),
            PasswordHash = passwordHash
        };

        _context.Users.Add(user);

        var (accessToken, expiresAt) = _jwtprovider.GenerateAccessToken(user);
        var refreshToken = _jwtprovider.GenerateRefreshToken(user.Id);

        _context.RefreshTokens.Add(refreshToken);
        await _context.SaveChangesAsync(cancellationToken);

        return new AuthResponseDto(
            user.Name,
            user.LastName,
            user.Email,
            accessToken,
            refreshToken.Token,
            expiresAt
        );
    }
    public async Task<AuthResponseDto> LoginAsync(LoginRequestDto request, CancellationToken cancellationToken = default)
    {
        var user = await _context.Users
            .FirstOrDefaultAsync(u => u.Email == request.Email.ToLowerInvariant(), cancellationToken);
        if (user is null || !BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
        {
            throw new InvalidOperationException("Invalid email or password");

        }
        var (accessToken, expiresAt) = _jwtprovider.GenerateAccessToken(user);
        var refreshToken = _jwtprovider.GenerateRefreshToken(user.Id);
        _context.RefreshTokens.Add(refreshToken);
        await _context.SaveChangesAsync(cancellationToken);


        return new AuthResponseDto(

            user.Name,
            user.LastName,
            user.Email,
            accessToken,
            refreshToken.Token,
            expiresAt
        );
    }
    public async Task<AuthResponseDto> RefreshTokenAsync(RefreshTokenRequestDto request, CancellationToken cancellationToken = default) {
        var storedToken = await _context.RefreshTokens
            .Include(rt => rt.User)
            .FirstOrDefaultAsync(rt => rt.Token == request.RefreshToken, cancellationToken);

        if (storedToken is null || !storedToken.IsActive)
        {
            throw new InvalidOperationException("Invalid or expired refresh token.");
        }
        storedToken.IsRevoked = true;

        var user = storedToken.User;
        var (newAccessToken, expiresAt) = _jwtprovider.GenerateAccessToken(user);
        var newRefreshToken = _jwtprovider.GenerateRefreshToken(user.Id);

        _context.RefreshTokens.Add(newRefreshToken);
        await _context.SaveChangesAsync(cancellationToken);

        return new AuthResponseDto(
            user.Name,
            user.LastName,
            user.Email,
            newAccessToken,
            newRefreshToken.Token,
            expiresAt
        );
    }
}


