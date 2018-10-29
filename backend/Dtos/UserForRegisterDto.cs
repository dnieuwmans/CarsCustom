using System.ComponentModel.DataAnnotations;

namespace backend.Dtos
{
    public class UserForRegisterDto
    {
        [Required]
        public string Username { get; set; }

        [Required]
        [StringLength(120, MinimumLength = 4, ErrorMessage = "You must specify password between 4 and 120 characters")]
        public string Password { get; set; }
    }
}