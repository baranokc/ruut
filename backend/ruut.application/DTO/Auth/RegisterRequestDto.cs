namespace ruut.application.DTO.Auth;

public record RegisterRequestDto (
    string Name,
    string LastName,
    string Email,
    string Password
);
