namespace ruut.application.DTO.Booking;

public record PassengerDto (
    string Name,
    string LastName,
    string IdentityNumber,
    string? PhoneNumber,
    string? Email,
    string? Gender,
    int SeatNumber
);