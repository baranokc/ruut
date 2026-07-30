using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ruut.application.DTO.Payment;
using ruut.application.Interfaces.Services;

namespace ruut.api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize] 
public class PaymentsController : ControllerBase
{
    private readonly IPaymentService _paymentService;

    public PaymentsController(IPaymentService paymentService)
    {
        _paymentService = paymentService;
    }

    /// <summary>
    /// 
    /// </summary>
    [HttpPost("process")]
    public async Task<IActionResult> ProcessPayment([FromBody] ProcessPaymentRequestDto request, CancellationToken cancellationToken)
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (string.IsNullOrEmpty(userIdClaim) || !Guid.TryParse(userIdClaim, out var userId))
        {
            return Unauthorized(new { message = "User is not authenticated." });
        }

        try
        {
            var isSuccess = await _paymentService.ProcessPaymentAsync(userId, request, cancellationToken);
            
            if (isSuccess)
            {
                return Ok(new { message = "Payment successful! Your booking is confirmed.", bookingId = request.BookingId });
            }

            return BadRequest(new { message = "Payment failed." });
        }
        catch (Exception ex) when (ex is KeyNotFoundException || ex is InvalidOperationException || ex is ArgumentException)
        {
            return BadRequest(new { message = ex.Message });
        }
    }
}