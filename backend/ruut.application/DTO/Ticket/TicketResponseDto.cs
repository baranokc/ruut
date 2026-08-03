using ruut.domain.Enums;

namespace ruut.application.DTO.Tickets;


public record TicketResponseDto(
    Guid Id,
    string CompanyName,
    string CompanyLogoUrl,
    string DepartureCity,
    string DepartureStation,
    string DestinationCity,
    string DestinationStation,
    string DepartureCode,
    string DestinationCode,
    DateTime DepartureTime,
    DateTime ArrivalTime,
    decimal Price,
    VehicleType VehicleType,
    int AvailableSeats
);