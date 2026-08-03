using Microsoft.EntityFrameworkCore;
using ruut.application.DTO.Trip;
using ruut.application.Interfaces.Services;
using ruut.domain.Enums;
using ruut.infrastructure.Persistence;

namespace ruut.infrastructure.Services;

public class TripService : ITripService
{
    private readonly AppDbContext _context;

    public TripService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<TripResponseDto>> GetUserTripsAsync(Guid userId, string? statusFilter = null, CancellationToken cancellationToken = default)
    {
        var now = DateTime.UtcNow;

        var bookings = await _context.Bookings
            .Include(b => b.Ticket)
                .ThenInclude(t => t.Company)
            .Include(b => b.Ticket)
                .ThenInclude(t => t.Route)
            .Include(b => b.Passengers)
            .AsNoTracking()
            .Where(b => b.UserId == userId && b.Status != BookingStatus.Pending)
            .ToListAsync(cancellationToken);

        var tripDtos = bookings.Select(b =>
        {
            string calculatedStatus;
            if (b.Status == BookingStatus.Cancelled)
            {
                calculatedStatus = "Cancelled";
            }
            else if (b.Ticket.DepartureTime < now)
            {
                calculatedStatus = "Completed";
            }
            else
            {
                calculatedStatus = "Active";
            }

            return new TripResponseDto(
                b.Id,
                b.TicketId,
                b.Ticket.Company.Name,
                b.Ticket.Company.LogoUrl,
                b.Ticket.Route.DepartureCity,
                b.Ticket.DepartureCode,
                b.Ticket.Route.DestinationCity,
                b.Ticket.DestinationCode,
                b.Ticket.DepartureTime,
                b.Ticket.ArrivalTime,
                b.TotalAmount,
                b.Ticket.VehicleType,
                b.Passengers.Count,
                calculatedStatus,
                b.CreatedAt
            );
        });

        if (!string.IsNullOrWhiteSpace(statusFilter))
        {
            tripDtos = tripDtos.Where(t => t.Status.Equals(statusFilter, StringComparison.OrdinalIgnoreCase));
        }

        return tripDtos.ToList();
    }

    public async Task<TripResponseDto?> GetTripsDetailsAsync(Guid userId, Guid bookingId, CancellationToken cancellationToken = default)
    {
        var trips = await GetUserTripsAsync(userId, null, cancellationToken);
        return trips.FirstOrDefault(t => t.BookingId == bookingId);
    }

    public async Task<bool> CancelTripAsync(Guid userId, Guid bookingId, CancellationToken cancellationToken = default)
    {
        var booking = await _context.Bookings
            .Include(b => b.Ticket)
            .Include(b => b.Passengers)
            .FirstOrDefaultAsync(b => b.Id == bookingId && b.UserId == userId, cancellationToken);

        if (booking is null) return false;

        if (booking.Status == BookingStatus.Cancelled || booking.Ticket.DepartureTime < DateTime.UtcNow)
        {
            throw new InvalidOperationException("This trip cannot be cancelled.");
        }

        booking.Status = BookingStatus.Cancelled;

        booking.Ticket.AvailableSeats += booking.Passengers.Count;

        _context.Bookings.Update(booking);
        _context.Tickets.Update(booking.Ticket);

        await _context.SaveChangesAsync(cancellationToken);
        return true;
    }
}