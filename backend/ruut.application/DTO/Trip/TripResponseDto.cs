using ruut.domain.Enums;

namespace ruut.application.DTO.Trip;

public record TripResponseDto(
    Guid BookingId,
    Guid TicketId,
    string CompanyName,
    string CompanyLogoUrl,
    string DepartureCity,
    string DepartureCode,
    string DestinationCity,
    string DestinationCode,
    DateTime DepartureTime,
    DateTime ArrivalTime,
    decimal TotalAmount,
    VehicleType VehicleType,
    int PassengerCount,
    string Status,
    DateTime BookedAt  
);