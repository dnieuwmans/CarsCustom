using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using backend.Dtos;
using backend.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        public readonly IConfiguration _config;
        public readonly IOrderRepository _repository;

        public OrdersController(IConfiguration configuration, IOrderRepository repository)
        {
            _config = configuration;
            _repository = repository;
        }

        [HttpGet]
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
    }
}