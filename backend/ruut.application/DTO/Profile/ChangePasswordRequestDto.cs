namespace ruut.application.DTO.Profile;

public record ChangePasswordRequestDto(
    string CurrentPassword,
    string NewPassword
);