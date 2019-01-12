using System.Collections.Generic;
using System.Threading.Tasks;
using backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace backend.Repositories
{
    public interface ICarRepository
    {
        Task<ICollection<Car>> GetAll();
        Task<ICollection<Car>> GetAllAvailable();
        Task<Car> GetSingle(int id);
        Task<ICollection<Car>> GetTotal();
        Task<bool> UpdateDisabled(int id);
    }
}