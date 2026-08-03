namespace ruut.application.DTO.Profile;

public record UserProfileResponseDto(
    Guid Id,
    string Name,
    string LastName,
    string Email,
    string PhoneNumber,
    string ProfileImageUrl,
    DateTime CreatedAt
);