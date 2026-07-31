using ruut.domain.Common;

namespace ruut.domain.Entities;

public class SavedPassenger : BaseEntity
{
    public Guid UserId { get; set; }
    public string Name { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string IdentityNumber { get; set; } = string.Empty;
    public DateTime? DateOfBirth { get; set; }
    public string? Gender { get; set; }

    public User User { get; set; } = null!;
}