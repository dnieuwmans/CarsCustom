using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using backend.Authentication;
using backend.Dtos;
using backend.Models;
using backend.Enums;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using backend.Utils;
using System.Net;
using Microsoft.AspNetCore.Authorization;

namespace DotNetApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        public readonly IAuthRepository _repository;
        public readonly IConfiguration _config;
        public AuthController(IAuthRepository repository, IConfiguration configuration)
        {
            _repository = repository;
            _config = configuration;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(UserForRegisterDto userForRegisterDto)
        {
            userForRegisterDto.Username = userForRegisterDto.Username.ToLower();

            if (await _repository.UserExists(userForRegisterDto.Username))
            {
                return BadRequest("Username already exists.");
            }

            var userToCreate = new User();
            Utils.CopyPropertiesTo(userForRegisterDto, userToCreate);
            userToCreate.Role = RoleEnum.CUSTOMER;

            var createdUser = await _repository.Register(userToCreate, userForRegisterDto.Password);

            return StatusCode(201);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(UserForLoginDto userForLoginDto)
        {
            var userFromRepo = await _repository.Login(userForLoginDto.Username.ToLower(), userForLoginDto.Password);

            if (userFromRepo == null) {
                return Unauthorized();
            }

            // this creates the token 

            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, userFromRepo.Id.ToString()),
                new Claim(ClaimTypes.Name, userFromRepo.Username),
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config.GetSection("AppSettings:Token").Value));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1), // 24h
                SigningCredentials = credentials
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return Ok(new {
                token = tokenHandler.WriteToken(token),
            });
        }

        [HttpGet("logged-in")]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<IActionResult> GetLoggedInUser()
        {
            // THIS IS BAD PRACTICE

            ClaimsPrincipal currentUser = this.User;
            var username = currentUser.Identity.Name;

            IDictionary<string, string> user = new Dictionary<string, string>
            {
                { "username", username }
            };

            return Ok(user);
        }

    } 
}