using System.Globalization;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using ruut.application.DTO.Booking;
using ruut.application.Interfaces.Services;
using ruut.domain.Entities;
using ruut.domain.Enums;
using ruut.infrastructure.Persistence;

namespace ruut.infrastructure.Services;

public class BookingService : IBookingService
{
    private readonly AppDbContext _context;
    public BookingService(AppDbContext context)
    {
        _context = context;
    }
    public async Task<BookingResponseDto> CreateBookingAsync(Guid userId, CreateBookingRequestDto request, CancellationToken cancellationtoken = default)
    {
        var ticket = await _context.Tickets
            .Include(t => t.Company)
            .Include(t => t.Route)
            .FirstOrDefaultAsync(t => t.Id == request.TicketId, cancellationtoken);
        if (ticket is null)
        {
            throw new KeyNotFoundException("Ticket not found");
        }

        int passengerCount = request.Passengers.Count;
        if (ticket.AvailableSeats < passengerCount)
        {
            throw new InvalidOperationException("Not enough available seats for this trip.");
        }
        var occupiedSeats = await GetOccupiedSeatsAsync(request.TicketId, cancellationtoken);
        var requestedSeats = request.Passengers.Select(p => p.SeatNumber).ToList();

        if (requestedSeats.Any(seat => occupiedSeats.Contains(seat)))
        {
            throw new InvalidOperationException("One or more selected seats are already occupied.)");
        }
        var booking = new Booking
        {
            UserId = userId,
            TicketId = ticket.Id,
            TotalAmount = ticket.Price * passengerCount,
            Status = BookingStatus.Pending,
            Passengers = request.Passengers.Select(p => new Passenger
            {
                Name = p.Name,
                LastName = p.LastName,
                IdentityNumber = p.IdentityNumber,
                SeatNumber = p.SeatNumber
            }).ToList()
        };
        ticket.AvailableSeats -= passengerCount;

        await _context.Bookings.AddAsync(booking, cancellationtoken);
        await _context.SaveChangesAsync(cancellationtoken);

        return new BookingResponseDto(
            booking.Id,
            ticket.Id,
            ticket.Company.Name,
            ticket.Route.DepartureCity,
            ticket.Route.DestinationCity,
            ticket.DepartureTime,
            booking.TotalAmount,
            booking.Status,
            booking.CreatedAt,
            booking.Passengers.Select(p => new PassengerResponseDto(
                p.Name, p.LastName, p.IdentityNumber, p.SeatNumber
            )).ToList()
        );
    }

    public async Task<List<int>> GetOccupiedSeatsAsync(Guid ticketId, CancellationToken cancellationToken = default)
    {
        return await _context.Passengers
            .Where(p => p.Booking.TicketId == ticketId && p.Booking.Status != BookingStatus.Cancelled)
            .Select(p => p.SeatNumber)
            .ToListAsync(cancellationToken);
    }
    public async Task<List<BookingResponseDto>> GetUserBookingAsync(Guid userId, CancellationToken cancellationToken = default)
    {
        return await _context.Bookings
            .Include(b => b.Ticket)
                .ThenInclude(t => t.Company)
            .Include(b => b.Ticket)
                .ThenInclude(t => t.Route)
            .Include(b => b.Passengers)
            .Where(b => b.UserId == userId)
            .OrderByDescending(b => b.CreatedAt)
            .Select(b => new BookingResponseDto(
                b.Id,
                b.TicketId,
                b.Ticket.Company.Name,
                b.Ticket.Route.DepartureCity,
                b.Ticket.Route.DestinationCity,
                b.Ticket.DepartureTime,
                b.TotalAmount,
                b.Status,
                b.CreatedAt,
                b.Passengers.Select(p => new PassengerResponseDto(
                    p.Name, p.LastName, p.IdentityNumber, p.SeatNumber
                )).ToList()
            )).ToListAsync(cancellationToken);
    }
}