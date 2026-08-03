using Microsoft.EntityFrameworkCore;
using ruut.application.DTO.Profile;
using ruut.application.Interfaces.Services;
using ruut.infrastructure.Persistence;

namespace ruut.infrastructure.Services;

public class ProfileService : IProfileService
{
    private readonly AppDbContext _context;

    public ProfileService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<UserProfileResponseDto> GetProfileAsync(Guid userId, CancellationToken cancellationToken = default)
    {
        var user = await _context.Users
            .AsNoTracking()
            .FirstOrDefaultAsync(u => u.Id == userId, cancellationToken);

        if (user is null)
        {
            throw new KeyNotFoundException("User not found.");
        }

        return new UserProfileResponseDto(
            user.Id,
            user.Name, 
            user.LastName,
            user.Email,
            user.PhoneNumber,
            user.ProfileImageUrl,
            user.CreatedAt
        );
    }

    public async Task<UserProfileResponseDto> UpdateProfileAsync(Guid userId, UpdateProfileRequestDto request, CancellationToken cancellationToken = default)
    {
        var user = await _context.Users
            .FirstOrDefaultAsync(u => u.Id == userId, cancellationToken);

        if (user is null)
        {
            throw new KeyNotFoundException("User not found.");
        }

        user.Name = request.Name;
        user.LastName = request.LastName;
#pragma warning disable CS8601 // Possible null reference assignment.
        user.PhoneNumber = request.PhoneNumber;
#pragma warning restore CS8601 // Possible null reference assignment.
#pragma warning disable CS8601 // Possible null reference assignment.
        user.ProfileImageUrl = request.ProfileImageUrl;
#pragma warning restore CS8601 // Possible null reference assignment.

        _context.Users.Update(user);
        await _context.SaveChangesAsync(cancellationToken);

        return new UserProfileResponseDto(
            user.Id,
            user.Name,
            user.LastName,
            user.Email,
            user.PhoneNumber,
            user.ProfileImageUrl,
            user.CreatedAt
        );
    }

    public async Task<bool> ChangePasswordAsync(Guid userId, ChangePasswordRequestDto request, CancellationToken cancellationToken = default)
    {
        var user = await _context.Users
            .FirstOrDefaultAsync(u => u.Id == userId, cancellationToken);

        if (user is null)
        {
            throw new KeyNotFoundException("User not found.");
        }

        if (!BCrypt.Net.BCrypt.Verify(request.CurrentPassword, user.PasswordHash))
        {
            throw new InvalidOperationException("Current password is incorrect.");
        }

        user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.NewPassword);

        _context.Users.Update(user);
        await _context.SaveChangesAsync(cancellationToken);

        return true;
    }
}