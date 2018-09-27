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
                    Colors = new List<string>
                    {
                        "#ffffff",
                        "#222222",
                    }
                },
                
                new CarDto()
                {
                    Id = 2,
                    Name = "BMW X5",
                    Description = "Another BMW",
                    Colors = new List<string>
                    {
                        "#ffffff",
                    }
                },
                
                new CarDto()
                {
                    Id = 3,
                    Name = "Jaguar XE",
                    Description = "Big cat",
                    Colors = new List<string>
                    {
                        "#ffffff",
                        "#f44336",
                        "#2196f3",
                    }
                }
            };
        }
    }
}