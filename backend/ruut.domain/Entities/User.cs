using System.Diagnostics.Contracts;
using ruut.domain.Common;

namespace ruut.domain.Entities;

public class User : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string PasswordHash { get; set; } = string.Empty;

    public ICollection<RefreshToken> RefreshTokens { get; set; } = new List<RefreshToken>();
    public ICollection<Favorite> Favorites { get; set; } = new List<Favorite>();
}