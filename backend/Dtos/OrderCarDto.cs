namespace backend.Dtos
{
    public class OrderCarDto
    {
        public string Brand { get; set; }
        public string Type { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public string ImageTemplate { get; set; }
        public bool Disabled { get; set; }
    }
}