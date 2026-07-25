using ruut.domain.Common;
using ruut.domain.Enums;

namespace ruut.domain.Entities;

public class Ticket : BaseEntity
{
    public Guid CompanyId { get; set; }
    public Company Company { get; set; } = null!;
    public Guid RouteId { get; set; }
    public Route Route { get; set; } = null!;

    public DateTime DepartureTime { get; set; }
    public DateTime ArrivalTime { get; set; }
    public decimal Price { get; set; }
    public string Currency { get; set; } = "TRY";
    public VehicleType VehicleType { get; set; }
    public string ProviderUrl { get; set; } = string.Empty;

    public ICollection<Favorite> Favorites { get; set; } = new List<Favorite>();

}