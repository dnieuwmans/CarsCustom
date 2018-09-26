using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;

namespace backend.Controllers 
{
    [Route("api/[controller]")]
    public class CarsController : Controller 
    {
        [HttpGet]
        public ActionResult getTotal()
        {
            return Ok(10);
        }
    }
}