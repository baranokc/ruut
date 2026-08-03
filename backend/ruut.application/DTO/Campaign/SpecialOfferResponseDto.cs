using ruut.domain.Enums;

namespace ruut.application.DTO.Campaign;

public record SpecialOfferResponseDto(
    Guid Id,
    string Title,
    string Description,
    string ImageUrl,
    string Code,
    VehicleType? VehichleType,
    DateTime ValidUntil
);