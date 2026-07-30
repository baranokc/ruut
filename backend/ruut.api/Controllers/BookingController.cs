using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ruut.application.DTO.Booking;
using ruut.application.Interfaces.Services;

namespace ruut.api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize] 
public class BookingsController : ControllerBase
{
    private readonly IBookingService _bookingService;

    public BookingsController(IBookingService bookingService)
    {
        _bookingService = bookingService;
    }

    /// <summary>
    /// 
    /// 
    /// </summary>
    [AllowAnonymous]
    [HttpGet("occupied-seats/{ticketId:guid}")]
    public async Task<IActionResult> GetOccupiedSeats(Guid ticketId, CancellationToken cancellationToken)
    {
        var seats = await _bookingService.GetOccupiedSeatsAsync(ticketId, cancellationToken);
        return Ok(seats);
    }

    /// <summary>
    ///
    /// </summary>
    [HttpPost]
    public async Task<IActionResult> CreateBooking([FromBody] CreateBookingRequestDto request, CancellationToken cancellationToken)
    {
        // JWT Token içinden giriş yapmış kullanıcının ID'sini (NameIdentifier) çekiyoruz
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (string.IsNullOrEmpty(userIdClaim) || !Guid.TryParse(userIdClaim, out var userId))
        {
            return Unauthorized(new { message = "User is not authenticated." });
        }

        try
        {
            var result = await _bookingService.CreateBookingAsync(userId, request, cancellationToken);
            return Ok(result);
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(new { message = ex.Message });
        }
    }

    /// <summary>
    /// 
    /// </summary>
    [HttpGet("my-bookings")]
    public async Task<IActionResult> GetUserBookings(CancellationToken cancellationToken)
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (string.IsNullOrEmpty(userIdClaim) || !Guid.TryParse(userIdClaim, out var userId))
        {
            return Unauthorized();
        }

        var bookings = await _bookingService.GetUserBookingAsync(userId, cancellationToken);
        return Ok(bookings);
    }
}