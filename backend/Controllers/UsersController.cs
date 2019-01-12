using backend.Repositories;
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
        public async Task<IActionResult> GetById(int id)
        {
            return Ok(await _repository.GetOneById(id));
        }

        [HttpPost("{id}/update")]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<IActionResult> Update(int id, UserForUpdateDto userForUpdateDto) 
        {
            var currentUser = await _repository.GetOneById(id);
            var username = currentUser.Username;

            return Ok(await _repository.Update(username, userForUpdateDto));
        }


        [HttpPost("update")]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<IActionResult> UpdateOwn(UserForUpdateDto userForUpdateDto) 
        {
            ClaimsPrincipal currentUser = this.User;
            var username = currentUser.Identity.Name;

            return Ok(await _repository.Update(username, userForUpdateDto));
        }

        [HttpPost("update/disabled")]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<IActionResult> UpdateDisabled(UserForDisableDto userForDisableDto) 
        {
            return Ok(await _repository.updateDisabled(userForDisableDto.Username));
        }
    }
}