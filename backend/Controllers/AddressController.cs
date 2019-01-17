using backend.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using backend.Dtos;
using System.Security.Claims;
using System.Net.Http;
using PostcodeAPI;
using PostcodeAPI.Wrappers;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AddressController : ControllerBase
    {

        [HttpGet("{postcode}/{number}")]
        public IActionResult GetAddress(string postcode, int number)
        {
            PostcodeApiClient client = new PostcodeApiClient("o16RF7JTwM1tKb63jxxe19F01PifOJ7MivocPB77");
            ApiHalResultWrapper result = client.GetAddress(postcode, number);

            return Ok(result);
        }


    }
}