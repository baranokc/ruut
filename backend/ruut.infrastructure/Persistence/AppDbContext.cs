using System.Security.Cryptography.X509Certificates;
using Microsoft.EntityFrameworkCore;
using ruut.domain.Entities;

namespace ruut.infrastructure.Persistence;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<User> Users => Set<User>();
    public DbSet<Company> Companies => Set<Company>();
    public DbSet<Route> Routes => Set<Route>();
    public DbSet<Ticket> Tickets => Set<Ticket>();
    public DbSet<Favorite> Favorites => Set<Favorite>();
    public DbSet<RefreshToken> RefreshTokens => Set<RefreshToken>();
    public DbSet<Booking> Bookings => Set<Booking>();
    public DbSet<Passenger> Passengers => Set<Passenger>();
    public DbSet<SavedPassenger> SavedPassengers => Set<SavedPassenger>();
    public DbSet<SpecialOffer> SpecialOffers => Set<SpecialOffer>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(AppDbContext).Assembly);
    }


}