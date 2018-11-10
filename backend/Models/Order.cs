using System.Collections.Generic;

namespace backend.Models
{
    public class Order
    {
        public int Id { get; set; }
        public int Status { get; set; }
        public OrderCar Car { get; set; }
        public OrderUser User { get; set; }
        public OrderColor SelectedColor { get; set; }
    }
}
