using backend.BusinessObjects;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    public class UsersController : Controller
    {
        [HttpGet]
        public ActionResult GetAll()
        {
            return Ok(UserBO.GetAll());
        }

        [HttpGet("GetById")]
        public ActionResult GetById()
        {
            return Ok();
        }
    }
}