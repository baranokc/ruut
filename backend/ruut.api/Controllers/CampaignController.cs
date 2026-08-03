using Microsoft.AspNetCore.Mvc;
using ruut.application.Interfaces.Services;
using ruut.domain.Enums;

namespace ruut.api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CampaignsController : ControllerBase
{
    private readonly ICampaignService _campaignService;

    public CampaignsController(ICampaignService campaignService)
    {
        _campaignService = campaignService;
    }

    /// <summary>
    /// 
    /// 
    /// </summary>
    [HttpGet]
    public async Task<IActionResult> GetSpecialOffers([FromQuery] VehicleType? vehicleType, CancellationToken cancellationToken)
    {
        var offers = await _campaignService.GetActiveOffersAsync(vehicleType, cancellationToken);
        return Ok(offers);
    }
}