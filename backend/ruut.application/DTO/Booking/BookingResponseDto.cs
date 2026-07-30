using ruut.domain.Enums;

namespace ruut.application.DTO.Booking;

public record BookingResponseDto(
    Guid BookingId,
    Guid TicketId,
    string CompanyName,
    string DepartureCity,
    string DestinationCity,
    DateTime DepartureTime,
    decimal TotalAmount,
    BookingStatus Status,
    DateTime CreatedAt,
    List<PassengerResponseDto> Passengers
);