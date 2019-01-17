using System;
using System.Collections.Generic;
using System.Net;
using System.Security.Claims;
using System.Threading.Tasks;
using backend.Dtos;
using backend.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Server.HttpSys;
using Microsoft.Extensions.Configuration;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = "Bearer")]
    public class OrdersController : ControllerBase
    {
        public readonly IConfiguration _config;
        public readonly IOrderRepository _repository;
        public readonly IUserRepository _userRepo;

        public OrdersController(IConfiguration configuration, IOrderRepository repository, IUserRepository userRepository)
        {
            _config = configuration;
            _repository = repository;
            _userRepo = userRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetOrders() 
        {
            return Ok(await _repository.GetAll());
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> AddOrder(OrderDto orderDto) 
        {
            return Ok(await _repository.Add(orderDto));
        }

        [HttpPost("{id}/update-status")]
        [AllowAnonymous]
        public async Task<IActionResult> UpdateOrderStatus(OrderDto orderDto) 
        {
            return Ok(await _repository.UpdateStatus(orderDto));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetOrderById(int id) 
        {
            var username = User.Identity.Name;

            return Ok(await _repository.GetByIdAndUsername(id, username));
        } 

        [HttpGet("my-orders")]
        public async Task<IActionResult> getMyOrders()
        {
            var username = User.Identity.Name;

            return Ok(await _repository.getByUsername(username));
        }
    }
}