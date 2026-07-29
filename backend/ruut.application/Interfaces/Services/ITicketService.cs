using ruut.application.DTO.Tickets;
using ruut.domain.Entities;

namespace ruut.application.Interfaces.Services;

public interface ITicketService
{
    Task<List<TicketResponseDto>> SearchTicketAsync(SearchTicketsRequestDto request, CancellationToken cancellationToken = default);
    Task<TicketResponseDto?> GetTicketByIdAsync(Guid id, CancellationToken cancellationToken = default);
}