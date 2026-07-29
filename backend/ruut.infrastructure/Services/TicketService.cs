using Microsoft.EntityFrameworkCore;
using ruut.application.DTO.Tickets;
using ruut.application.Interfaces.Services;
using ruut.domain.Entities;
using ruut.infrastructure.Persistence;

namespace ruut.infrastructure.Services;

public class TicketService : ITicketService
{
    private readonly AppDbContext _context;

    public TicketService(AppDbContext context)
    {
        _context = context;
    }
    public async Task<List<TicketResponseDto>> SearchTicketAsync(SearchTicketsRequestDto request, CancellationToken cancellationToken = default)
    {
        var query = _context.Tickets
            .Include(t => t.Route)
            .Include(t => t.Company)
            .AsNoTracking()
            .AsQueryable();
        if (!string.IsNullOrWhiteSpace(request.DepartureCity))
        {
            query = query.Where(t => t.Route.DepartureCity.ToLower() == request.DepartureCity.ToLower());
        }
        if (!string.IsNullOrWhiteSpace(request.DestinationCity))
        {
            query = query.Where(t => t.Route.DestinationCity.ToLower() == request.DestinationCity.ToLower());
        }

        var searchDate = request.Date.Date;
        query = query.Where(t => t.DepartureTime.Date == searchDate);

        query = query.Where(t => t.AvailableSeats >= request.PassengerCount);

        if (request.Type.HasValue)
        {
            query = query.Where(t => t.VehicleType == request.Type.Value);
        }

        if (request.MaxPrice.HasValue)
        {
            query = query.Where(t => t.Price <= request.MaxPrice.Value);
        }

        query = request.SortBy?.ToLower() switch
        {
            "price_asc" => query.OrderBy(t => t.Price),
            "price_desc" => query.OrderByDescending(t => t.Price),
            "departure_asc" => query.OrderBy(t => t.DepartureTime),
            _ => query.OrderBy(t => t.DepartureTime)
        };

        return await query.Select(t => new TicketResponseDto(
            t.Id,
            t.Company.Name,
            t.Company.LogoUrl,
            t.Route.DepartureCity,
            t.Route.DepartureStation,
            t.Route.DestinationCity,
            t.Route.DestinationStation,
            t.DepartureTime,
            t.ArrivalTime,
            t.Price,
            t.VehicleType,
            t.AvailableSeats
        )).ToListAsync(cancellationToken);
    }

    public async Task<TicketResponseDto?> GetTicketByIdAsync(Guid id, CancellationToken cancellationToken = default)
    {
        var ticket = await _context.Tickets
            .Include(t => t.Route)
            .Include(t => t.Company)
            .AsNoTracking()
            .FirstOrDefaultAsync(t => t.Id == id, cancellationToken);

        if (ticket is null) return null;

        return new TicketResponseDto(
            ticket.Id,
            ticket.Company.Name,
            ticket.Company.LogoUrl,
            ticket.Route.DepartureCity,
            ticket.Route.DepartureStation,
            ticket.Route.DestinationCity,
            ticket.Route.DestinationStation,
            ticket.DepartureTime,
            ticket.ArrivalTime,
            ticket.Price,
            ticket.VehicleType,
            ticket.AvailableSeats
        );
    }
}