using System;
using System.Configuration;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.Extensions.Configuration;


#nullable disable

namespace Ejercicio01.Models
{
    public partial class Ejercicio01Context : DbContext
    {
        public Ejercicio01Context()
        {
        }
        public Ejercicio01Context(DbContextOptions<Ejercicio01Context> options)
            : base(options)
        {
        }
        public virtual DbSet<Contacto> Contactos { get; set; }
        public virtual DbSet<Direccion> Direccions { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            IConfigurationRoot configuration = new ConfigurationBuilder()
                .SetBasePath(AppDomain.CurrentDomain.BaseDirectory)
                .AddJsonFile("appsettings.json")
                .Build();
            optionsBuilder.UseSqlServer(configuration.GetConnectionString("DataBase"));
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "Modern_Spanish_CI_AS");

            modelBuilder.Entity<Contacto>(entity =>
            {
                entity.ToTable("contactos");

                entity.Property(e => e.Estado)
                    .HasMaxLength(15)
                    .IsUnicode(false);

                entity.Property(e => e.Nombre)
                    .IsRequired()
                    .HasMaxLength(35)
                    .IsUnicode(false);

                entity.Property(e => e.Telefono)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.HasOne(d => d.Direccion)
                    .WithMany(p => p.Contactos)
                    .HasForeignKey(d => d.DireccionId)
                    .HasConstraintName("FK_contactos_direccion");
            });

            modelBuilder.Entity<Direccion>(entity =>
            {
                entity.ToTable("direccion");

                entity.Property(e => e.Calle)
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.Ciudad)
                    .HasMaxLength(25)
                    .IsUnicode(false);

                entity.Property(e => e.Colonia)
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.Cp).HasColumnName("CP");

                entity.Property(e => e.Entidad)
                    .HasMaxLength(35)
                    .IsUnicode(false);
            });
            OnModelCreatingPartial(modelBuilder);
        }
        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
