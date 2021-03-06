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
    [Authorize(AuthenticationSchemes = "Bearer")]
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
        public async Task<IActionResult> GetAll() 
        {
            return Ok(await _repository.GetAll());
        } 

        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetById(int id)
        {
            return Ok(await _repository.GetOneById(id));
        }

        [HttpPost("{id}/update")]
        public async Task<IActionResult> Update(int id, UserForUpdateDto userForUpdateDto) 
        {
            var currentUser = await _repository.GetOneById(id);
            var username = currentUser.Username;

            return Ok(await _repository.Update(username, userForUpdateDto));
        }


        [HttpPost("update")]
        public async Task<IActionResult> UpdateOwn(UserForUpdateDto userForUpdateDto) 
        {
            var username = User.Identity.Name;

            return Ok(await _repository.Update(username, userForUpdateDto));
        }

        [HttpPost("update/disabled")]
        public async Task<IActionResult> UpdateDisabled(UserForDisableDto userForDisableDto) 
        {
            return Ok(await _repository.updateDisabled(userForDisableDto.Username));
        }
    }
}