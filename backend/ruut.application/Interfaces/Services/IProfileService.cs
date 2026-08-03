using ruut.application.DTO.Profile;

namespace ruut.application.Interfaces.Services;

public interface IProfileService
{
    Task<UserProfileResponseDto> GetProfileAsync(Guid userId, CancellationToken cancellationToken = default);
    Task<UserProfileResponseDto> UpdateProfileAsync(Guid userId, UpdateProfileRequestDto request, CancellationToken cancellationToken = default);
    Task<bool> ChangePasswordAsync(Guid userId, ChangePasswordRequestDto request, CancellationToken cancellationToken = default);
}