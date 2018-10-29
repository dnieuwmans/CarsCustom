using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    public class UsersController : Controller
    {
        [HttpGet]
        public ActionResult GetAll()
        {
            return Ok("");
        }

        [HttpGet("{id}")]
        public ActionResult GetById(int id)
        {
            return Ok();
        }
    }
}