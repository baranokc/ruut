using System;
namespace ruut.application.DTO.Auth;

public record AuthResponseDto(
    string Name,
    string LastName,
    string Email,
    string AccessToken,
    string RefreshToken,
    DateTime AccessTokenExpiresAt
    );