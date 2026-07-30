using ruut.application.DTO.Booking;

namespace ruut.application.Interfaces.Services;

public interface IBookingService
{
    Task<BookingResponseDto> CreateBookingAsync(Guid userId, CreateBookingRequestDto request, CancellationToken cancellationToken = default);
    Task<List<int>> GetOccupiedSeatsAsync(Guid ticketID, CancellationToken cancellationToken = default);
    Task<List<BookingResponseDto>> GetUserBookingAsync(Guid userId, CancellationToken cancellationToken = default);
}