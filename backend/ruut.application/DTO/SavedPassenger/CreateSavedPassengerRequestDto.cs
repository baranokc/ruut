namespace ruut.application.DTO.SavedPassenger;

public record CreateSavedPassengerRequestDto (
    string Name,
    string LastName,
    string IdentityNumber,
    DateTime? DateOfBirth,
    string? Gender
);
