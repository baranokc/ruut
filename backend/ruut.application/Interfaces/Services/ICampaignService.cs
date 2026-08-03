using ruut.application.DTO.Campaign;
using ruut.domain.Enums;

namespace ruut.application.Interfaces.Services;

public interface ICampaignService
{
    Task<List<SpecialOfferResponseDto>> GetActiveOffersAsync(VehicleType? vehicleType = null, CancellationToken cancellationToken = default);
}