using ruut.domain.Enums;
using ruut.domain.Common;

namespace ruut.domain.Entities;

public class SpecialOffer : BaseEntity
{
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string ImageUrl { get; set; } = string.Empty;
    public string Code { get; set; } = string.Empty;
    public VehicleType? VehicleType { get; set; }
    public bool IsActive { get; set; } = true;
    public DateTime ValidUntil { get; set; }
    
}