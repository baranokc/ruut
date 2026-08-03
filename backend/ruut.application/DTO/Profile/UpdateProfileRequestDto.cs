namespace ruut.application.DTO.Profile;

public record UpdateProfileRequestDto(
    string Name,
    string LastName,
    string? PhoneNumber,
    string? ProfileImageUrl
);