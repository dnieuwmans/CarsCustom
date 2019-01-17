using System.ComponentModel.DataAnnotations;
using backend.Enums;

namespace backend.Dtos
{
    public class UserForRegisterDto
    {
        [Required]
        [StringLength(100, MinimumLength = 2, ErrorMessage = "You must specify a first name between 2 and 100 characters")]
        public string Username { get; set; }

        [Required]
        [StringLength(100, MinimumLength = 8, ErrorMessage = "You must specify a first name between 8 and 100 characters")]
        public string Password { get; set; }

        [Required]
        [StringLength(100, MinimumLength = 8, ErrorMessage = "You must specify a first name between 8 and 100 characters")]
        [Compare("Password", ErrorMessage = "password and confirm password do not match")]
        public string ConfirmPassword { get; set; }
        
        [Required]
        [StringLength(100, MinimumLength = 2, ErrorMessage = "You must specify a first name between 2 and 100 characters")]
        public string FirstName { get; set; }
        
        [Required]
        [StringLength(100, MinimumLength = 2, ErrorMessage = "You must specify a last name between 2 and 100 characters")]
        public string LastName { get; set; }
        
        [Required]
        public string Email { get; set; }
        
        [Required]
        public string Street { get; set; }
        
        [Required]
        [StringLength(6, MinimumLength = 1, ErrorMessage = "You must specify a last name between 1 and 6 characters")]
        public string StreetNumber { get; set; }
        
        [Required]
        public string City { get; set; }
        
        [Required]
        [StringLength(6, MinimumLength = 6, ErrorMessage = "You must specify a last name between 6 and 6 characters")]
        public string ZipCode { get; set; }

        [Required]
        [StringLength(13, MinimumLength = 10, ErrorMessage = "You must specify a phone number between 10 and 13 characters")]        
        public string Phone { get; set; }

        public int? Role { get; set; }
    }
}