namespace ruut.application.DTO.Booking;

public record PassengerDto (
    string Name,
    string LastName,
    string IdentityNumber,
    int SeatNumber
);