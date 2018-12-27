﻿using backend.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using backend.Dtos;
using System.Security.Claims;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        public readonly IConfiguration _config;
        public readonly IUserRepository _repository;

        public UsersController(IConfiguration configuration, IUserRepository repository)
        {
            _config = configuration;
            _repository = repository;
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<IActionResult> GetAll() 
        {
            return Ok(await _repository.GetAll());
        } 

        [HttpGet("{id}")]
        public ActionResult GetById(int id)
        {
            return Ok();
        }

        [HttpPost("update")]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<IActionResult> Update(UserForUpdateDto userForUpdateDto) 
        {
            ClaimsPrincipal currentUser = this.User;
            var username = currentUser.Identity.Name;

            return Ok(await _repository.Update(username, userForUpdateDto));
        }
    }
}