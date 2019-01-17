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
    public class OrderStatusesController : ControllerBase
    {
        public readonly IConfiguration _config;
        public readonly IOrderStatusRepository _repository;

        public OrderStatusesController(IConfiguration configuration, IOrderStatusRepository repository)
        {
            _config = configuration;
            _repository = repository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll() 
        {
            return Ok(await _repository.GetAll());
        } 
    }
}