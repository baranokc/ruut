public record UpdateSavedPassengerRequestDto(
    string Name,
    string LastName,
    string IdentityNumber,
    DateTime? DateOfBirth,
    string? Gender
);