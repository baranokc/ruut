using ruut.application.DTO.Trip;
using ruut.domain.Entities;

namespace ruut.application.Interfaces.Services;

public interface ITripService
{
    Task<List<TripResponseDto>> GetUserTripsAsync(Guid userId, string? statusFilter = null, CancellationToken cancellationToken = default);
    Task<TripResponseDto?> GetTripsDetailsAsync(Guid userId, Guid bookingId, CancellationToken cancellationToken = default);
    Task<bool> CancelTripAsync(Guid userId, Guid bookingId, CancellationToken cancellationToken = default);
}