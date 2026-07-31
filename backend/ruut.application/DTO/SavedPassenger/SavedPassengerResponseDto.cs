public record SavedPassengerResponseDto(
    Guid Id,
    string Name,
    string LastName,
    string IdentityNumber,
    DateTime? DateOfBirth,
    string? Gender,
    DateTime CreatedAt
);