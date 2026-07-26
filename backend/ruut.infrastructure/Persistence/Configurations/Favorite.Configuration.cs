using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ruut.domain.Entities;

namespace ruut.infrastructure.Persistence.Configuration;

public class FavoriteConfiguration : IEntityTypeConfiguration<Favorite>
{
    public void Configure(EntityTypeBuilder<Favorite> builder)
    {
        builder.HasKey(f => f.Id);
        builder.HasIndex(f => new { f.UserId, f.TicketId }).IsUnique();

        builder.HasOne(f => f.User)
            .WithMany(u => u.Favorites)
            .HasForeignKey(f => f.UserId)
            .OnDelete(DeleteBehavior.Cascade);
        builder.HasOne(f => f.Ticket)
            .WithMany(t => t.Favorites)
            .HasForeignKey(f => f.TicketId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}