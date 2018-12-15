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
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<IActionResult> GetOrders() 
        {
            return Ok(await _repository.GetAll());
        }

        [HttpPost]
        public async Task<IActionResult> AddOrder(OrderDto orderDto) 
        {
            return Ok(await _repository.Add(orderDto));
        }

        [HttpGet("{token}")]
        public async Task<IActionResult> GetOrderByToken(string token) 
        {
            return Ok(await _repository.GetByToken(token));
        } 

        [HttpGet("my-orders")]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<IActionResult> getMyOrders()
        {
            // THIS IS BAD PRACTICE, we may need to figure out another way

            ClaimsPrincipal currentUser = this.User;
            var username = currentUser.Identity.Name;

            return Ok(await _repository.getByUsername(username));
        }
    }
}