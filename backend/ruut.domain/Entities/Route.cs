using ruut.domain.Common;

namespace ruut.domain.Entities;

public class Route : BaseEntity
{
    public string DepartureCity { get; set; } = string.Empty;
    public string DepartureStation { get; set; } = string.Empty;

    public string DestinationCity { get; set; } = string.Empty;
    public string DestinationStation { get; set; } = string.Empty;

    public ICollection<Ticket> Tickets = new List<Ticket>();
}