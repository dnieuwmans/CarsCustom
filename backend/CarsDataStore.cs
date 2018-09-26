using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Models;

namespace backend
{
    public class CarsDataStore
    {
        public static CarsDataStore Current { get; } = new CarsDataStore();
        public List<CarDto> Cars { get; set; }

        public CarsDataStore()
        {
            Cars = new List<CarDto>()
            {
                new CarDto()
                {
                    Id = 1,
                    Name = "BMW I3",
                    Description = "A BMW",
                },
                
                new CarDto()
                {
                    Id = 2,
                    Name = "BMW X5",
                    Description = "Another BMW",
                },
                
                new CarDto()
                {
                    Id = 3,
                    Name = "Jaguar XE",
                    Description = "Big cat",
                }
            };
        }
    }
}