using System.Collections.Generic;
using System.Threading.Tasks;
using backend.Dtos;
using backend.Models;

namespace backend.Repositories
{
    public interface IOrderStatusRepository
    {
        Task<ICollection<OrderStatus>> GetAll();
    }
}