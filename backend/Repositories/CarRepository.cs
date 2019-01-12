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
    public class CarRepository : ICarRepository
    {
        private readonly DataContext _dataContext;

        public CarRepository(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<ICollection<Car>> GetAll() 
        {
            return await _dataContext.Cars.Include(c => c.Colors).Include(c => c.Accessories).ToListAsync();
        }

        public async Task<ICollection<Car>> GetAllAvailable()
        {
            return await _dataContext.Cars.Include(c => c.Colors).Include(c => c.Accessories).Where(c => c.Disabled == false).ToListAsync(); 
        }

        public async Task<Car> GetSingle(int id) 
        {
            return await _dataContext.Cars.Include(c => c.Colors).Include(c => c.Accessories).FirstOrDefaultAsync(c => c.Id == id); 
        }

        public async Task<ICollection<Car>> GetTotal() 
        {
            return await _dataContext.Cars.Where(c => c.Disabled == false).ToListAsync(); 
        }


        public async Task<bool> UpdateDisabled(int id) 
        {
            var car = await _dataContext.Cars.FirstOrDefaultAsync(c => c.Id == id);

            car.Disabled = !car.Disabled;

            _dataContext.Cars.Update(car);
            _dataContext.SaveChanges();

            return true;
        }
    }
}