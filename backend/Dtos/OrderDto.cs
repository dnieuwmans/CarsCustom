using System.Collections.Generic;

namespace backend.Dtos
{
    public class OrderDto
    {
        public int Id { get; set; }
        public OrderCarDto Car { get; set; }
        public OrderColorDto SelectedColor { get; set; }
        public OrderUserDto User { get; set; }
        public ICollection<OrderAccessoryDto> selectedAccessories { get; set; }
        public OrderStatusDto Status { get; set; }
        public string Username { get; set; }
    }
}