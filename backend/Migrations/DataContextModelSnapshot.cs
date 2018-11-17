﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using backend.Data;

namespace backend.Migrations
{
    [DbContext(typeof(DataContext))]
    partial class DataContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.1.4-rtm-31024");

            modelBuilder.Entity("backend.Models.Accessory", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int?>("CarId");

                    b.Property<decimal>("Cost");

                    b.Property<string>("Description");

                    b.HasKey("Id");

                    b.HasIndex("CarId");

                    b.ToTable("Accessories");
                });

            modelBuilder.Entity("backend.Models.Car", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Brand");

                    b.Property<string>("Description");

                    b.Property<bool>("Disabled");

                    b.Property<string>("ImageTemplate");

                    b.Property<decimal>("Price");

                    b.Property<string>("Type");

                    b.HasKey("Id");

                    b.ToTable("Cars");
                });

            modelBuilder.Entity("backend.Models.Color", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int?>("CarId");

                    b.Property<string>("Hex");

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.HasIndex("CarId");

                    b.ToTable("Colors");
                });

            modelBuilder.Entity("backend.Models.Order", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int?>("CarId");

                    b.Property<int?>("SelectedColorId");

                    b.Property<int?>("StatusId");

                    b.Property<string>("Token");

                    b.Property<int?>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("CarId");

                    b.HasIndex("SelectedColorId");

                    b.HasIndex("StatusId");

                    b.HasIndex("UserId");

                    b.ToTable("Orders");
                });

            modelBuilder.Entity("backend.Models.OrderAccessory", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<decimal>("Cost");

                    b.Property<string>("Description");

                    b.Property<int?>("OrderId");

                    b.HasKey("Id");

                    b.HasIndex("OrderId");

                    b.ToTable("OrderAccessory");
                });

            modelBuilder.Entity("backend.Models.OrderCar", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Brand");

                    b.Property<string>("Description");

                    b.Property<bool>("Disabled");

                    b.Property<string>("ImageTemplate");

                    b.Property<decimal>("Price");

                    b.Property<string>("Type");

                    b.HasKey("Id");

                    b.ToTable("OrderCars");
                });

            modelBuilder.Entity("backend.Models.OrderColor", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Hex");

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.ToTable("OrderColors");
                });

            modelBuilder.Entity("backend.Models.OrderStatus", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Value");

                    b.HasKey("Id");

                    b.ToTable("OrderStatuses");
                });

            modelBuilder.Entity("backend.Models.OrderUser", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("City");

                    b.Property<string>("Email");

                    b.Property<string>("FirstName");

                    b.Property<string>("LastName");

                    b.Property<string>("Phone");

                    b.Property<string>("Street");

                    b.Property<string>("StreetNumber");

                    b.Property<string>("ZipCode");

                    b.HasKey("Id");

                    b.ToTable("OrderUsers");
                });

            modelBuilder.Entity("backend.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Email");

                    b.Property<string>("FirstName");

                    b.Property<string>("LastName");

                    b.Property<byte[]>("PasswordHash");

                    b.Property<byte[]>("PasswordSalt");

                    b.Property<string>("Phone");

                    b.Property<int>("Role");

                    b.Property<string>("Username");

                    b.Property<string>("city");

                    b.Property<bool>("disabled");

                    b.Property<string>("street");

                    b.Property<string>("streetNumber");

                    b.Property<string>("zipCode");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("backend.Models.Accessory", b =>
                {
                    b.HasOne("backend.Models.Car")
                        .WithMany("Accessories")
                        .HasForeignKey("CarId");
                });

            modelBuilder.Entity("backend.Models.Color", b =>
                {
                    b.HasOne("backend.Models.Car")
                        .WithMany("Colors")
                        .HasForeignKey("CarId");
                });

            modelBuilder.Entity("backend.Models.Order", b =>
                {
                    b.HasOne("backend.Models.OrderCar", "Car")
                        .WithMany()
                        .HasForeignKey("CarId");

                    b.HasOne("backend.Models.OrderColor", "SelectedColor")
                        .WithMany()
                        .HasForeignKey("SelectedColorId");

                    b.HasOne("backend.Models.OrderStatus", "Status")
                        .WithMany()
                        .HasForeignKey("StatusId");

                    b.HasOne("backend.Models.OrderUser", "User")
                        .WithMany()
                        .HasForeignKey("UserId");
                });

            modelBuilder.Entity("backend.Models.OrderAccessory", b =>
                {
                    b.HasOne("backend.Models.Order")
                        .WithMany("SelectedAccessories")
                        .HasForeignKey("OrderId");
                });
#pragma warning restore 612, 618
        }
    }
}
