
using Microsoft.EntityFrameworkCore;
using ToursAPI.Model;

namespace ToursAPI.DataBase
{
    public class AppDbContext : Microsoft.EntityFrameworkCore.DbContext
    {
        public Microsoft.EntityFrameworkCore.DbSet<Tour> Tours => Set<Tour>();
        public Microsoft.EntityFrameworkCore.DbSet<FilterSection> FilterSections { get; set; }

        public AppDbContext(Microsoft.EntityFrameworkCore.DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(Microsoft.EntityFrameworkCore.ModelBuilder modelBuilder)
        {
            // Tour
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Tour>(entity =>
            {
                entity.HasKey(t => t.Id);
                entity.Property(t => t.Id).ValueGeneratedNever();

                entity.HasIndex(t => t.ArrivalCity);
                entity.HasIndex(t => t.TourPrice);
                entity.HasIndex(t => t.Rating);
                entity.HasIndex(t => t.MealPlan);
            });

            // 🔧 FilterSection — ИСПРАВЛЕНО для EF Core 10
            modelBuilder.Entity<FilterSection>(entity =>
            {
                entity.HasKey(e => e.Key);
                entity.Property(e => e.Key).HasMaxLength(100);

                // ✅ Просто ToJson() — без HasColumnType!
                entity.OwnsMany(e => e.Items, builder =>
                {
                    builder.ToJson();
                });

                entity.HasIndex(e => e.Type);
            });
        }
    }
}