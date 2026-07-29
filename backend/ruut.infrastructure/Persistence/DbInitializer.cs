using System.Security.Cryptography;
using System.Security.Permissions;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking.Internal;
using ruut.domain.Entities;
using ruut.domain.Enums;

namespace ruut.infrastructure.Persistence;

public static class DbInitializer
{
    public static async Task SeedAsync(AppDbContext context)
    {
        await context.Database.MigrateAsync();

        if (await context.Companies.AnyAsync())
        {
            return;
        }

        var companies = new List<Company>
        {
            new(){Name = "Metro Turizm",Code = "METRO",LogoUrl = "https://example.com/metro.png"},
            new(){Name = "Kamil Koç",Code ="KAMILKOC",LogoUrl = "https://example.com/kamilkoc.png"},
            new(){Name ="Pamukkale Turizm",Code ="PAMUKKALE",LogoUrl ="https://example.com/pamukkale.png"},
            new(){Name ="Türk Hava Yolları",Code ="THY ",LogoUrl ="https://example.com/thy.png"},
            new(){Name ="Pegasus",Code ="PGS",LogoUrl ="https://example.com/pgs.png" }
        };

        await context.Companies.AddRangeAsync(companies);
        await context.SaveChangesAsync();

        var routeIstanbulAnkara = new Route
        {
            DepartureCity = "Istanbul",
            DepartureStation = "Esenler Otogarı",
            DestinationCity = "Ankara",
            DestinationStation = "AŞTİ Otogarı"
        };
        var routeIstanbulIzmir = new Route
        {
            DepartureCity = "Istanbul",
            DepartureStation = "Sabiha Gökçen Havalimanı",
            DestinationCity = "Izmir",
            DestinationStation = "Adnan Menderes Havalimanı"
        };

        await context.Routes.AddRangeAsync(routeIstanbulAnkara, routeIstanbulIzmir);
        await context.SaveChangesAsync();

        var today = DateTime.UtcNow.Date;

        var tickets = new List<Ticket>
        {
        new()
        {
            RouteId = routeIstanbulAnkara.Id,
            CompanyId = companies[0].Id,
            DepartureTime = today.AddDays(1).AddHours(8),
            ArrivalTime = today.AddDays(1).AddHours(14),
            Price = 450.00m,
            VehicleType = (VehicleType)1,
            AvailableSeats = 32
        },
        new()
        {
            RouteId = routeIstanbulAnkara.Id,
            CompanyId = companies[1].Id,
            DepartureTime = today.AddDays(1).AddHours(10),
            ArrivalTime = today.AddDays(1).AddHours(15).AddMinutes(30),
            Price = 500.00m,
            VehicleType = (VehicleType)1,
            AvailableSeats = 16
        },
        new()
        {
            RouteId = routeIstanbulIzmir.Id,
            CompanyId = companies[2].Id,
            DepartureTime = today.AddDays(1).AddHours(9),
            ArrivalTime = today.AddDays(1).AddHours(10).AddMinutes(15),
            Price = 1250.00m,
            VehicleType = (VehicleType)2,
            AvailableSeats = 80
        },
        new()
        {
            RouteId = routeIstanbulIzmir.Id,
            CompanyId = companies[3].Id,
            DepartureTime = today.AddDays(1).AddHours(13),
            ArrivalTime = today.AddDays(1).AddHours(14).AddMinutes(10),
            Price = 980.00m,
            VehicleType = (VehicleType)2,
            AvailableSeats = 45
        }
    };
        await context.Tickets.AddRangeAsync(tickets);
        await context.SaveChangesAsync();
    }
}