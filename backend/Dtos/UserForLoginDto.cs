using System.ComponentModel.DataAnnotations;

namespace backend.Dtos
{
    public class UserForLoginDto
    {
        public string Username { get; set; }

        public string Password { get; set; }
    }
}