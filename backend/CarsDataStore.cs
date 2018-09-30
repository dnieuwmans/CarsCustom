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
                    ImageTemplate = "bmw-7-%color%.png",
                    Colors = new List<ColorDto>
                    {
                        new ColorDto
                        {
                            Id = 1,
                            Name = "silver",
                            Hex = "#f0f0f0",
                        },
                        new ColorDto
                        {
                            Id = 2,
                            Name = "red",
                            Hex = "#f44336",
                        },
                        new ColorDto
                        {
                            Id = 3,
                            Name = "blue",
                            Hex = "#2196f3",
                        }
                    }
                },
                
                new CarDto()
                {
                    Id = 2,
                    Brand = "BMW",
                    Type = "i8",
                    Description = "Awesome car",
                    Price = 61100.00,
                    ImageTemplate = "bmw-i8-%color%.png",
                    Colors = new List<ColorDto>
                    {
                        new ColorDto
                        {
                            Id = 1,
                            Name = "white",
                            Hex = "#fff",
                        },
                        new ColorDto
                        {
                            Id = 4,
                            Name = "black",
                            Hex = "#222",
                        },
                    }
                },
                
                new CarDto()
                {
                    Id = 3,
                    Brand = "Jaguar",
                    Type = "XE",
                    Description = "Big cat",
                    Price = 55120.00,
                    ImageTemplate = "jaguar-xe-%color%.png",
                    Colors = new List<ColorDto>
                    {
                        new ColorDto
                        {
                            Id = 4,
                            Name = "black",
                            Hex = "#222",
                        },
                    }
                }
            };
        }
    }
}