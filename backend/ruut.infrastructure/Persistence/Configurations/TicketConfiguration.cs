using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ruut.domain.Entities;

namespace ruut.infrastructure.Persistence.Configuration;

public class TicketConfiguration : IEntityTypeConfiguration<Ticket>
{
    public void Configure(EntityTypeBuilder<Ticket> builder)
    {
        builder.HasKey(t => t.Id);
        builder.Property(t => t.Price)
            .HasColumnType("decimal(18,2)")
            .IsRequired();
        builder.HasOne(t => t.Company)
            .WithMany(c => c.Tickets)
            .HasForeignKey(t => t.CompanyId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(t => t.Route)
            .WithMany(r => r.Tickets)
            .HasForeignKey(t => t.RouteId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}