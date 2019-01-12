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
        public async Task<ActionResult> getAllAvailable()
        {            
            return Ok(await _repository.GetAllAvailable());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> getSingle(int id)
        {
            
            return Ok(await _repository.GetSingle(id));
        }
        
        [HttpGet("total")]
        public async Task<ActionResult> getTotal()
        {
            var values = await _repository.GetTotal();
            return Ok(/* values.Count*/);
        }

        [HttpGet("all")]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<ActionResult> getAll()
        {
            return Ok(await _repository.GetAll());
        }

        [HttpPost("update/disabled")]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<IActionResult> UpdateDisabled(CarForDisableDto carForDisableDto) 
        {
            return Ok(await _repository.UpdateDisabled(carForDisableDto.Id));
        }
    }
}