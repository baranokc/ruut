using ruut.domain.Common;
using ruut.domain.Enums;

namespace ruut.domain.Entities;

public class Booking : BaseEntity
{
    public Guid UserId { get; set; }
    public Guid TicketId { get; set; }
    public decimal TotalAmount { get; set; }
    public BookingStatus Status { get; set; } = BookingStatus.Confirmed;

    public User User { get; set; } = null!;
    public Ticket Ticket { get; set; } = null!;
    public ICollection<Passenger> Passengers { get; set; } = new List<Passenger>();

}