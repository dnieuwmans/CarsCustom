using System.ComponentModel.DataAnnotations;

namespace backend.Dtos
{
    public class UserForDisableDto
    {
        [Required]
        public string Username { get; set; }
    }
}