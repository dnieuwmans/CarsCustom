using System;
using System.Threading.Tasks;
using backend.Dtos;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        public readonly IConfiguration _config;
        public OrdersController(IConfiguration configuration)
        {
            _config = configuration;
        }

        [HttpPost]
        public async Task<IActionResult> AddOrder(OrderDto orderDto) 
        {
            return Ok(orderDto);
        }
    }
}