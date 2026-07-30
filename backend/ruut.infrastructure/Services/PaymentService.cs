using Microsoft.EntityFrameworkCore;
using ruut.application.DTO.Payment;
using ruut.application.Interfaces.Services;
using ruut.domain.Enums;
using ruut.infrastructure.Persistence;

namespace ruut.infrastructure.Services;

public class PaymentService : IPaymentService
{
    private readonly AppDbContext _context;

    public PaymentService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<bool> ProcessPaymentAsync(Guid userId, ProcessPaymentRequestDto request, CancellationToken cancellationToken = default)
    {
        var booking = await _context.Bookings
            .FirstOrDefaultAsync(b => b.Id == request.BookingId && b.UserId == userId, cancellationToken);

        if (booking is null)
        {
            throw new KeyNotFoundException("Booking not found or access denied.");
        }

        if (booking.Status == BookingStatus.Confirmed)
        {
            throw new InvalidOperationException("This booking has already been paid for.");
        }

        if (booking.Status == BookingStatus.Cancelled)
        {
            throw new InvalidOperationException("This booking is cancelled and cannot be paid.");
        }

        if (string.IsNullOrWhiteSpace(request.CardNumber) || request.CardNumber.Length != 16)
        {
            throw new ArgumentException("Invalid card number. It must be 16 digits.");
        }

        if (string.IsNullOrWhiteSpace(request.Cvv) || request.Cvv.Length != 3)
        {
            throw new ArgumentException("Invalid CVV.");
        }

        await Task.Delay(500, cancellationToken); 

  
        booking.Status = BookingStatus.Confirmed;
        
        _context.Bookings.Update(booking);
        await _context.SaveChangesAsync(cancellationToken);

        return true;
    }
}