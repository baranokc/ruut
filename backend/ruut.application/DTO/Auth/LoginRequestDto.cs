namespace ruut.application.DTO.Auth;

public record LoginRequestDto (
    string Email,
    string Password
);