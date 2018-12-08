using backend.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Threading.Tasks;

namespace backend.Controllers
{
    [Route("api/[controller]")]
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
        public ActionResult GetById(int id)
        {
            return Ok();
        }
       
    }
}