using System.Collections.Generic;

namespace backend.Models
{
    public class Order
    {
        public int Id { get; set; }
        public OrderStatus Status { get; set; }
        public string Token { get; set; }
        public OrderCar Car { get; set; }
        public OrderUser User { get; set; }
        public OrderColor SelectedColor { get; set; }
        public ICollection<OrderAccessory> SelectedAccessories { get; set; }
        public string Username { get; set; }
    }
}
