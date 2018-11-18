using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers 
{
    [Route("api/[controller]")]
    public class CarsController : Controller 
    {
        private readonly DataContext _dataContext;

        public CarsController(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        [HttpGet]
        public async Task<ActionResult> getAll()
        {
            var values = await _dataContext.Cars.Include(c => c.Colors).Include(c => c.Accessories).ToListAsync(); 
            
            return Ok(values);
        }
        
        [HttpGet("total")]
        public async Task<ActionResult> getTotal()
        {
            var values = await _dataContext.Cars.ToListAsync(); 
            
            return Ok(values.Count);
        }
    }
}