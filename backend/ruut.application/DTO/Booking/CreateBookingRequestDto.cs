namespace ruut.application.DTO.Booking;

public record CreateBookingRequestDto(
    Guid TicketId,
    List<PassengerDto> Passengers
);