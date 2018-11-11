using System.Collections.Generic;

namespace backend.Dtos
{
    public class OrderDto
    {
        public OrderCarDto Car { get; set; }
        public OrderColorDto SelectedColor { get; set; }
        public OrderUserDto User { get; set; }
    }
}