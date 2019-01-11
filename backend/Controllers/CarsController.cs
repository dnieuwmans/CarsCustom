using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers 
{
    [Route("api/[controller]")]
    [ApiController]
    public class CarsController : ControllerBase
    {
        private readonly DataContext _dataContext;

        public CarsController(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        [HttpGet]
        public async Task<ActionResult> getAllAvailable()
        {
            var values = await _dataContext.Cars.Include(c => c.Colors).Include(c => c.Accessories).Where(c => c.Disabled == false).ToListAsync(); 
            
            return Ok(values);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> getSingle(int id)
        {
            var values = await _dataContext.Cars.Include(c => c.Colors).Include(c => c.Accessories).FirstOrDefaultAsync(c => c.Id == id); 
            
            return Ok(values);
        }
        
        [HttpGet("total")]
        public async Task<ActionResult> getTotal()
        {
            var values = await _dataContext.Cars.Where(c => c.Disabled == false).ToListAsync(); 
            
            return Ok(values.Count);
        }

        [HttpGet("all")]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<ActionResult> getAll()
        {
            var values = await _dataContext.Cars.Include(c => c.Colors).Include(c => c.Accessories).ToListAsync();

            return Ok(values);
        }
    }
}