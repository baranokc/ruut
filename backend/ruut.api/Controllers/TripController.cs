using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using ruut.application.DTO.Trip;
using ruut.application.Interfaces.Services;

namespace ruut.api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TripController : ControllerBase
{
    private readonly ITripService _tripService;

    public TripController(ITripService tripService)
    {
        _tripService = tripService;
    }
    private Guid GetCurrentUserId()
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (string.IsNullOrEmpty(userIdClaim) || !Guid.TryParse(userIdClaim, out var userId))
        {
            throw new UnauthorizedAccessException("User is not authenticated");
        }
        return userId;
    }

    /// <summary>
    /// 
    /// </summary>
    [HttpGet]
    public async Task<IActionResult> GetMyTrips([FromQuery] string? status, CancellationToken cancellationToken)
    {
        var userId = GetCurrentUserId();
        var trips = await _tripService.GetUserTripsAsync(userId, status, cancellationToken);
        return Ok(trips);
    }
    /// <summary>
    /// 
    /// </summary>
    [HttpGet("{bookingId:guid}")]
    public async Task<IActionResult> GetTripDetails(Guid bookingId, CancellationToken cancellationToken)
    {
        var userId = GetCurrentUserId();
        var trip = await _tripService.GetTripsDetailsAsync(userId, bookingId, cancellationToken);

        if (trip is null)
            return NotFound(new { message = "Trip not found." });

        return Ok(trip);
    }

    /// <summary>
    /// 
    /// </summary>
    [HttpPost("{bookingId:guid}/cancel")]
    public async Task<IActionResult> CancelTrip(Guid bookingId, CancellationToken cancellationToken)
    {
        var userId = GetCurrentUserId();
        try
        {
            var isCancelled = await _tripService.CancelTripAsync(userId, bookingId, cancellationToken);
            if (!isCancelled)
                return NotFound(new { message = "Trip not found." });

            return Ok(new { message = "Trip cancelled successfully and seats updated." });
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }
}