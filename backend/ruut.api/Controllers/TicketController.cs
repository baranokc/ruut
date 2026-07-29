using Microsoft.AspNetCore.Mvc;
using ruut.application.DTO.Tickets;
using ruut.application.Interfaces.Services;

namespace ruut.api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TicketController : ControllerBase
{
    private readonly ITicketService _ticketService;

    public TicketController(ITicketService ticketService)
    {
        _ticketService = ticketService;
    }
    /// <summary>
    /// 
    /// </summary>
    [HttpGet("search")]
    public async Task<IActionResult> Search([FromQuery] SearchTicketsRequestDto request, CancellationToken cancellationToken)
    {
        var tickets = await _ticketService.SearchTicketAsync(request, cancellationToken);
        return Ok(tickets);
    }
    ///<summary>
    ///
    ///</summary>
    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetById(Guid id, CancellationToken cancellationToken)
    {
        var ticket = await _ticketService.GetTicketByIdAsync(id, cancellationToken);
        if (ticket is null)
        {
            return NotFound(new { message = "Ticket not found." });
        }
        return Ok(ticket);
    }
}