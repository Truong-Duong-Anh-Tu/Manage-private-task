using Microsoft.EntityFrameworkCore;
using MissionAPI.Models;
namespace MissionAPI.Data;
public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
    : base(options) { }
    public DbSet<Mission> Missions => Set<Mission>();
}
