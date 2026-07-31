using ruut.application.DTO.SavedPassenger;

namespace ruut.application.Interfaces.Services;

public interface ISavedPassengerService
{
    Task<List<SavedPassengerResponseDto>> GetUserSavedPassengersAsync(Guid userId, CancellationToken cancellationToken = default);
    Task<SavedPassengerResponseDto?> GetByIdAsync(Guid userId, Guid id, CancellationToken cancellationToken = default);
    Task<SavedPassengerResponseDto> CreateAsync(Guid userId, CreateSavedPassengerRequestDto request, CancellationToken cancellationToken = default);
    Task<SavedPassengerResponseDto> UpdateAsync(Guid userId, Guid id, UpdateSavedPassengerRequestDto request, CancellationToken cancellationToken = default);
    Task<bool> DeleteAsync(Guid userId, Guid id, CancellationToken cancellationToken = default);
}