using System.Diagnostics.Contracts;
using ruut.domain.Common;

namespace ruut.domain.Entities;

public class Passenger : BaseEntity
{
    public Guid BookingId { get; set; }
    public string Name { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string IdentityNumber { get; set; } = string.Empty;
    public int SeatNumber { get; set; }

    public Booking Booking { get; set; } = null!;
}