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
    public class OrderStatusRepository : IOrderStatusRepository
    {
        private readonly DataContext _context;

        public OrderStatusRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<ICollection<OrderStatus>> GetAll()
        {
            return await _context.OrderStatuses.ToListAsync();
        }

    }
}