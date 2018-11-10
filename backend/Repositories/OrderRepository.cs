using System;
using System.Threading.Tasks;
using backend.Data;
using backend.Dtos;
using backend.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace backend.Repositories
{
    public class OrderRepository : IOrderRepository
    {
        private readonly DataContext _context;

        public OrderRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<ICollection<Order>> GetAll() {
            return await _context.Orders
                .Include(o => o.Car)
                .Include(o => o.SelectedColor)
                .Include(o => o.User)
                .ToListAsync();
        }

        public async Task<Order> Add(OrderDto orderDto)
        {
            // First create the order dependencies like car, color and user.
            // Car
            OrderCar orderCar = new OrderCar(){
                Brand = orderDto.Car.Brand,
                Type = orderDto.Car.Type,
                Description = orderDto.Car.Description,
                Price = orderDto.Car.Price,
                ImageTemplate = orderDto.Car.ImageTemplate,
                Disabled = false,
            };

            // Color
            OrderColor orderColor = new OrderColor(){
                Hex = orderDto.SelectedColor.Hex,
                Name = orderDto.SelectedColor.Name,
            };

            // User
            OrderUser orderUser = new OrderUser(){
                City = orderDto.User.City,
                Email = orderDto.User.Email,
                FirstName = orderDto.User.FirstName,
                LastName = orderDto.User.LastName,
                Phone = orderDto.User.Phone,
                Street = orderDto.User.Street,
                StreetNumber = orderDto.User.StreetNumber,
                ZipCode = orderDto.User.ZipCode,
            };

            // Now put it all togeter in the order 
            Order order = new Order(){
                Car = orderCar,
                SelectedColor = orderColor,
                User = orderUser,
                Status = 0,
            };


            await _context.Orders.AddAsync(order);
            await _context.SaveChangesAsync();

            return order;
        }
    }
}