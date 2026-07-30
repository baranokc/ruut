using ruut.domain.Enums;

namespace ruut.application.DTO.Booking;

public record PassengerResponseDto (
    string Name,
    string LastName,
    string IdentityNumber,
    int SeatNumber
);