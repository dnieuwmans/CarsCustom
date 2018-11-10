using System.Collections.Generic;
using System.Threading.Tasks;
using backend.Dtos;
using backend.Models;

namespace backend.Repositories
{
    public interface IOrderRepository
    {
        Task<ICollection<Order>> GetAll();
        Task<Order> Add(OrderDto orderDto);
    }
}