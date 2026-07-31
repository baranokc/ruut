using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ruut.application.DTO.SavedPassenger;
using ruut.application.Interfaces.Services;

namespace ruut.api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class SavedPassengersController : ControllerBase
{
    private readonly ISavedPassengerService _savedPassengerService;

    public SavedPassengersController(ISavedPassengerService savedPassengerService)
    {
        _savedPassengerService = savedPassengerService;
    }

    private Guid GetCurrentUserId()
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (string.IsNullOrEmpty(userIdClaim) || !Guid.TryParse(userIdClaim, out var userId))
        {
            throw new UnauthorizedAccessException("User is not authenticated.");
        }
        return userId;
    }

    /// <summary>
    /// 
    /// </summary>
    [HttpGet]
    public async Task<IActionResult> GetAll(CancellationToken cancellationToken)
    {
        var userId = GetCurrentUserId();
        var passengers = await _savedPassengerService.GetUserSavedPassengersAsync(userId, cancellationToken);
        return Ok(passengers);
    }

    /// <summary>
    /// 
    /// </summary>
    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetById(Guid id, CancellationToken cancellationToken)
    {
        var userId = GetCurrentUserId();
        var passenger = await _savedPassengerService.GetByIdAsync(userId, id, cancellationToken);

        if (passenger is null)
            return NotFound(new { message = "Saved passenger not found." });

        return Ok(passenger);
    }

    /// <summary>
    ///
    /// </summary>
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateSavedPassengerRequestDto request, CancellationToken cancellationToken)
    {
        var userId = GetCurrentUserId();
        var result = await _savedPassengerService.CreateAsync(userId, request, cancellationToken);
        return CreatedAtAction(nameof(GetById), new { id = result.Id }, result);
    }

    /// <summary>
    ///
    /// </summary>
    [HttpPut("{id:guid}")]
    public async Task<IActionResult> Update(Guid id, [FromBody] UpdateSavedPassengerRequestDto request, CancellationToken cancellationToken)
    {
        var userId = GetCurrentUserId();
        try
        {
            var result = await _savedPassengerService.UpdateAsync(userId, id, request, cancellationToken);
            return Ok(result);
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(new { message = ex.Message });
        }
    }

    /// <summary>
    ///
    /// </summary>
    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id, CancellationToken cancellationToken)
    {
        var userId = GetCurrentUserId();
        var isSuccess = await _savedPassengerService.DeleteAsync(userId, id, cancellationToken);

        if (!isSuccess)
            return NotFound(new { message = "Saved passenger not found." });

        return NoContent();
    }
}