using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using backend.Data;
using backend.Dtos;
using backend.Models;
using backend.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace backend.Controllers 
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = "Bearer")]
    public class CarsController : ControllerBase
    {
        public readonly IConfiguration _config;
        public readonly ICarRepository _repository;

        public CarsController(IConfiguration configuration, ICarRepository repository)
        {
            _config = configuration;
            _repository = repository;
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult> getAllAvailable()
        {            
            return Ok(await _repository.GetAllAvailable());
        }

        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<ActionResult> getSingle(int id)
        {
            
            return Ok(await _repository.GetSingle(id));
        }
        
        [HttpGet("total")]
        [AllowAnonymous]
        public async Task<ActionResult> getTotal()
        {
            var count = await _repository.GetTotal();
            return Ok(count);
        }

        [HttpGet("all")]
        public async Task<ActionResult> getAll()
        {
            return Ok(await _repository.GetAll());
        }

        [HttpPost("update/disabled")]
        public async Task<IActionResult> UpdateDisabled(CarForDisableDto carForDisableDto) 
        {
            return Ok(await _repository.UpdateDisabled(carForDisableDto.Id));
        }
    }
}