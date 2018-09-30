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
                    Price = 105695,
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
                    Price = 145000,
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
                    Price = 65000,
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
                },

                new CarDto()
                {
                    Id = 4,
                    Brand = "Dodge",
                    Type = "Viper SRT Coupe",
                    Description = "Viper Coupe model 2017",
                    Price = 93477.00,
                    ImageTemplate = "dodge-viper-%color%.png",
                    Colors = new List<ColorDto>
                    {
                        new ColorDto
                        {
                            Id = 5,
                            Name = "yellow",
                            Hex = "#ffeb3b",
                        },
                        new ColorDto
                        {
                            Id = 2,
                            Name = "red",
                            Hex = "#f44336",
                        },
                    }
                },

                new CarDto()
                {
                    Id = 5,
                    Brand = "Ford",
                    Type = "Mustang",
                    Description = "Ford Mustang model 2015",
                    Price = 42425,
                    ImageTemplate = "ford-mustang-%color%.png",
                    Colors = new List<ColorDto>
                    {
                        new ColorDto
                        {
                            Id = 2,
                            Name = "red",
                            Hex = "#f44336",
                        },
                    }
                },

                new CarDto()
                {
                    Id = 6,
                    Brand = "Lamborghini",
                    Type = "Huracan",
                    Description = "Lamborghini Huracan model 2018",
                    Price = 258423,
                    ImageTemplate = "lamborghini-huracan-%color%.png",
                    Colors = new List<ColorDto>
                    {
                        new ColorDto
                        {
                            Id = 6,
                            Name = "orange",
                            Hex = "#ff9800",
                        },
                    }
                },

                new CarDto()
                {
                    Id = 7,
                    Brand = "Lamborghini",
                    Type = "Centenario",
                    Description = "Lamborghini Centenario Holy Sh*t Edition",
                    Price = 1800000,
                    ImageTemplate = "lamborghini-centenario-%color%.png",
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