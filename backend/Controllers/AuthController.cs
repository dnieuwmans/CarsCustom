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
using backend.Repositories;

namespace DotNetApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = "Bearer")]
    public class AuthController : ControllerBase
    {
        public readonly IAuthRepository _repository;
        public readonly IConfiguration _config;
        public readonly IUserRepository _userRepo;
        public AuthController(IAuthRepository repository, IConfiguration configuration, IUserRepository userRepo)
        {
            _repository = repository;
            _config = configuration;
            _userRepo = userRepo;
        }

        [HttpPost("register")]
        [AllowAnonymous]
        public async Task<IActionResult> Register(UserForRegisterDto userForRegisterDto)
        {
            userForRegisterDto.Username = userForRegisterDto.Username.ToLower();

            if (await _repository.UserExists(userForRegisterDto.Username))
            {
               string[] error = new string[] { "Username already exists." };

                var response = new Dictionary<string, string[]> {
                    {"Username", error},
                };
                
                return BadRequest(response);
            }

            var userToCreate = new User();
            Utils.CopyPropertiesTo(userForRegisterDto, userToCreate);

            if (userForRegisterDto.Role == -1)
            {
                userToCreate.Role = RoleEnum.CUSTOMER;
            }
            else
            {
                userToCreate.Role = (RoleEnum)userForRegisterDto.Role;
            }

            var createdUser = await _repository.Register(userToCreate, userForRegisterDto.Password);

            return StatusCode(201);
        }

        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<IActionResult> Login(UserForLoginDto userForLoginDto)
        {
            var userFromRepo = await _repository.Login(userForLoginDto.Username.ToLower(), userForLoginDto.Password);

            if (userFromRepo == null)
            {
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

            return Ok(new
            {
                token = tokenHandler.WriteToken(token),
            });
        }

        [HttpGet("logged-in")]
        public async Task<IActionResult> GetLoggedInUser()
        {
            var username = User.Identity.Name;
            var user = await _userRepo.GetOneByUsername(username);

            // TODO: we may want to map it to another model or serialize it.

            return Ok(user);
        }

    }
}