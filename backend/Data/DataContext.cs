using backend.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        // The models will be added here.
        public DbSet<Car> Cars { get; set; }
        public DbSet<Color> Colors { get; set; }
        public DbSet<Accessory> Accessories { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderCar> OrderCars { get; set; }
        public DbSet<OrderColor> OrderColors { get; set; }
        public DbSet<OrderUser> OrderUsers { get; set; }
        public DbSet<OrderStatus> OrderStatuses { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder) {
            // modelBuilder.Entity<User>(entity =>
            // {
            //     // Set key for entity
            //     entity.HasKey(u => u.Id);
            // });

            // base.OnModelCreating(modelBuilder);
        }
    }
}
