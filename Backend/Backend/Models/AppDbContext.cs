using Microsoft.EntityFrameworkCore;

namespace Backend.Models
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Player> Players { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Player>()
                .Property(p => p.Price)
                .HasPrecision(18, 2);

        }
    }
}