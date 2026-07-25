using ruut.domain.Common;

namespace ruut.domain.Entities;

public class Favorite : BaseEntity
{
    public Guid UserId { get; set; }
    public User User { get; set; } = null!;
    public Guid TicketId { get; set; }
    public Ticket Ticket { get; set; } = null!;
}