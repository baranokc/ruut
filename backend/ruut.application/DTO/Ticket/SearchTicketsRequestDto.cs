using ruut.domain.Enums;

namespace ruut.application.DTOs.Tickets;

public record SearchTicketsRequestDto(
    string DepartureCity,
    string DestinationCity,
    DateTime Date,
    VehicleType? Type, 
    decimal? MaxPrice, 
    string? SortBy     
);