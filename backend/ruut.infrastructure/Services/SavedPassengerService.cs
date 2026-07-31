using Microsoft.EntityFrameworkCore;
using ruut.application.DTO.SavedPassenger;
using ruut.application.Interfaces.Services;
using ruut.domain.Entities;
using ruut.infrastructure.Persistence;

namespace ruut.infrastructure.Services;

public class SavedPassengerService : ISavedPassengerService
{
    private readonly AppDbContext _context;

    public SavedPassengerService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<SavedPassengerResponseDto>> GetUserSavedPassengersAsync(Guid userId, CancellationToken cancellationToken = default)
    {
        return await _context.SavedPassengers
            .AsNoTracking()
            .Where(sp => sp.UserId == userId)
            .OrderByDescending(sp => sp.CreatedAt)
            .Select(sp => new SavedPassengerResponseDto(
                sp.Id,
                sp.Name,
                sp.LastName,
                sp.IdentityNumber,
                sp.DateOfBirth,
                sp.Gender,
                sp.CreatedAt
            ))
            .ToListAsync(cancellationToken);
    }

    public async Task<SavedPassengerResponseDto?> GetByIdAsync(Guid userId, Guid id, CancellationToken cancellationToken = default)
    {
        var passenger = await _context.SavedPassengers
            .AsNoTracking()
            .FirstOrDefaultAsync(sp => sp.Id == id && sp.UserId == userId, cancellationToken);

        if (passenger is null) return null;

        return new SavedPassengerResponseDto(
            passenger.Id,
            passenger.Name,
            passenger.LastName,
            passenger.IdentityNumber,
            passenger.DateOfBirth,
            passenger.Gender,
            passenger.CreatedAt
        );
    }

    public async Task<SavedPassengerResponseDto> CreateAsync(Guid userId, CreateSavedPassengerRequestDto request, CancellationToken cancellationToken = default)
    {
        var passenger = new SavedPassenger
        {
            UserId = userId,
            Name = request.Name,
            LastName = request.LastName,
            IdentityNumber = request.IdentityNumber,
            DateOfBirth = request.DateOfBirth,
            Gender = request.Gender
        };

        await _context.SavedPassengers.AddAsync(passenger, cancellationToken);
        await _context.SaveChangesAsync(cancellationToken);

        return new SavedPassengerResponseDto(
            passenger.Id,
            passenger.Name,
            passenger.LastName,
            passenger.IdentityNumber,
            passenger.DateOfBirth,
            passenger.Gender,
            passenger.CreatedAt
        );
    }

    public async Task<SavedPassengerResponseDto> UpdateAsync(Guid userId, Guid id, UpdateSavedPassengerRequestDto request, CancellationToken cancellationToken = default)
    {
        var passenger = await _context.SavedPassengers
            .FirstOrDefaultAsync(sp => sp.Id == id && sp.UserId == userId, cancellationToken);

        if (passenger is null)
        {
            throw new KeyNotFoundException("Saved passenger not found.");
        }

        passenger.Name = request.Name;
        passenger.LastName = request.LastName;
        passenger.IdentityNumber = request.IdentityNumber;
        passenger.DateOfBirth = request.DateOfBirth;
        passenger.Gender = request.Gender;

        _context.SavedPassengers.Update(passenger);
        await _context.SaveChangesAsync(cancellationToken);

        return new SavedPassengerResponseDto(
            passenger.Id,
            passenger.Name,
            passenger.LastName,
            passenger.IdentityNumber,
            passenger.DateOfBirth,
            passenger.Gender,
            passenger.CreatedAt
        );
    }

    public async Task<bool> DeleteAsync(Guid userId, Guid id, CancellationToken cancellationToken = default)
    {
        var passenger = await _context.SavedPassengers
            .FirstOrDefaultAsync(sp => sp.Id == id && sp.UserId == userId, cancellationToken);

        if (passenger is null)
        {
            return false;
        }

        _context.SavedPassengers.Remove(passenger);
        await _context.SaveChangesAsync(cancellationToken);

        return true;
    }
}