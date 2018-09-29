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
                    Brand = "BMW",
                    Type = "7 series",
                    Description = "Sedan - Driving Luxery",
                    Price = 25400.00,
                    Image = "bmw-7-red.png",
                    Colors = new List<string>
                    {
                        "#ffffff",
                        "#f44336",
                        "#2196f3",
                    }
                },
                
                new CarDto()
                {
                    Id = 2,
                    Brand = "BMW",
                    Type = "i8",
                    Description = "Awesome car",
                    Price = 61100.00,
                    Image = "bmw-i8-white.png",
                    Colors = new List<string>
                    {
                        "#ffffff",
                    }
                },
                
                new CarDto()
                {
                    Id = 3,
                    Brand = "Jaguar",
                    Type = "XE",
                    Description = "Big cat",
                    Price = 55120.00,
                    Image = "jaguar-xe-black.png",
                    Colors = new List<string>
                    {
                        "#ffffff",
                        "#222222",
                    }
                }
            };
        }
    }
}