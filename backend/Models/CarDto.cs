using System.Collections.Generic;

namespace backend.Models
{
    public class CarDto
    {
        public int Id { get; set; }
        public string Brand { get; set; }
        public string Type { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public string Image_template { get; set; }
        public IEnumerable<ColorDto> Colors { get; set; }
        public bool Disabled { get; set; }
    }
}