using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.BusinessObjects;
using backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers 
{
    [Route("api/[controller]")]
    public class CarsController : Controller 
    {
        [HttpGet]
        public ActionResult getAll()
        {
            return Ok(CarBO.GetAll());
        }
        
        [HttpGet("total")]
        public ActionResult getTotal()
        {
            return Ok(CarBO.GetAll().Count);
        }
    }
}