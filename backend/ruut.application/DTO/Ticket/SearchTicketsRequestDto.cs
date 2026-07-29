using ruut.domain.Enums;

namespace ruut.application.DTO.Tickets;

public record SearchTicketsRequestDto(
    string DepartureCity,
    string DestinationCity,
    DateTime Date,
    int PassengerCount = 1,
    VehicleType? Type = null,
    decimal? MaxPrice = null,
    string? SortBy = null
);