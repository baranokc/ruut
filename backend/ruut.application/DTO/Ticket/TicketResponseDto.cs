using ruut.domain.Enums;

namespace ruut.application.DTO.Tickets;

public record TicketResponseDto(
    Guid TicketId,
    string CompanyName,
    string CompanyLogoUrl,
    string DepartureCity,
    string DepartureStation,
    string DestinationCity,
    string DestinationStation,
    DateTime DepartureTime,
    DateTime ArrivalTime,
    decimal Price,
    VehicleType Type,
    int AvailableSeats
);