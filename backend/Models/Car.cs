using System.Collections.Generic;

namespace backend.Models
{
    public class Car
    {
        public int Id { get; set; }
        public string Brand { get; set; }
        public string Type { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public string ImageTemplate { get; set; }
        public bool Disabled { get; set; }
        public ICollection<Color> Colors { get; set; }
        public ICollection<Accessory> Accessories { get; set; }
    }
}
