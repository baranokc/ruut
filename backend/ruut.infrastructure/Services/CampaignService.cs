using Microsoft.EntityFrameworkCore;
using ruut.application.DTO.Campaign;
using ruut.application.Interfaces.Services;
using ruut.domain.Entities;
using ruut.domain.Enums;
using ruut.infrastructure.Persistence;

namespace ruut.infrastructure.Services;

public class CampaignService : ICampaignService
{
    private readonly AppDbContext _context;

    public CampaignService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<SpecialOfferResponseDto>> GetActiveOffersAsync(VehicleType? vehicleType = null, CancellationToken cancellationToken = default)
    {
        var now = DateTime.UtcNow;

        var query = _context.SpecialOffers
            .AsNoTracking()
            .Where(o => o.IsActive && o.ValidUntil > now);

        if (vehicleType.HasValue)
        {
            query = query.Where(o => o.VehicleType == null || o.VehicleType == vehicleType.Value);
        }

        return await query
            .OrderByDescending(o => o.CreatedAt)
            .Select(o => new SpecialOfferResponseDto(
                o.Id,
                o.Title,
                o.Description,
                o.ImageUrl,
                o.Code,
                o.VehicleType,
                o.ValidUntil
            ))
            .ToListAsync(cancellationToken);
    }
}