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
        // TODO: we must figure out how we can manage a many-to-many relationship
        // public IEnumerable<ColorDto> Colors { get; set; }
        public bool Disabled { get; set; }
    }
}
