using System;
using System.Threading.Tasks;
using backend.Data;
using backend.Dtos;
using backend.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Security.Cryptography;
using System.Text;
using System.Linq;

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
                .Include(o => o.Status)
                .Include(o => o.SelectedAccessories)
                .ToListAsync();
        }

        public async Task<Order> GetByToken(string token) {
            return await _context.Orders
                .Include(o => o.Car)
                .Include(o => o.SelectedColor)
                .Include(o => o.User)
                .Include(o => o.Status)
                .Include(o => o.SelectedAccessories)
                .FirstOrDefaultAsync(o => o.Token == token);
        }

        public async Task<Dictionary<string, string>> Add(OrderDto orderDto)
        {
            OrderStatus orderStatus = await _context.OrderStatuses.FirstOrDefaultAsync(o => o.Value == "New");

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

            // Accessories
            // TODO: this can be done in an easier way, I imagine?
            ICollection<OrderAccessory> orderAccessories = new List<OrderAccessory>();

            foreach (var orderAccessoryDto in orderDto.selectedAccessories)
            {
                var newAccessory = new OrderAccessory(){
                    Description = orderAccessoryDto.Description,
                    Cost = orderAccessoryDto.Cost,
                };

                orderAccessories.Add(newAccessory);
            }

            // Now put it all togeter in the order 

            // But first let's generate a random token
            var AllowableCharacters = "abcdefghijklmnopqrstuvwxyz0123456789";
            var token = "";
            var bytes = new byte[64];

            using (var random = RandomNumberGenerator.Create())
            {
                random.GetBytes(bytes);
            }

            token = new string(bytes.Select(x => AllowableCharacters[x % AllowableCharacters.Length]).ToArray());

            Order order = new Order(){
                Token = token,
                Car = orderCar,
                SelectedColor = orderColor,
                User = orderUser,
                Status = orderStatus,
                SelectedAccessories = orderAccessories,
                Username = orderDto.Username,
            };


            await _context.Orders.AddAsync(order);
            await _context.SaveChangesAsync();

            var response = new Dictionary<string, string> {
                {"token", order.Token},
            };

            return response;
        }

        public async Task<ICollection<Order>> getByUsername(string username) {
            return await _context.Orders
                .Include(o => o.Car)
                .Include(o => o.SelectedColor)
                .Include(o => o.User)
                .Include(o => o.Status)
                .Include(o => o.SelectedAccessories)
                .Where(o => o.Username == username)
                .ToListAsync();
        }
    }
}