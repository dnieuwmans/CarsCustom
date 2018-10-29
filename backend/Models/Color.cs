namespace backend.Models
{
    public class Color
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Hex { get; set; }
        // TODO: we must figure out how we can make a many-to-many relationship with car
    }
}
