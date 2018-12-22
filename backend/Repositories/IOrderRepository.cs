using System.Collections.Generic;
using System.Threading.Tasks;
using backend.Dtos;
using backend.Models;

namespace backend.Repositories
{
    public interface IOrderRepository
    {
        Task<ICollection<Order>> GetAll();
        Task<Dictionary<string, int>> Add(OrderDto orderDto);
        Task<Order> GetByIdAndUsername(int id, string username);
        Task<ICollection<Order>> getByUsername(string username);
    }
}