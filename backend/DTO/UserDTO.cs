using backend.Enums;
using Microsoft.AspNetCore.Identity;

namespace backend.DTO
{
    public class UserDTO : IdentityUser
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Adress { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public RoleEnum RoleEnum { get; set; }
        public bool disabled { get; set; }
  }
}