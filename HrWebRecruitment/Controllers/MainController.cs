using Microsoft.AspNetCore.Mvc;

namespace HrWebRecruitment.Controllers
{
    public class MainController : Controller
    {
        [HttpGet]
        public IActionResult Index()
        {
            return View();
        }

        [HttpGet("/Admin")]
        public IActionResult Admin()
        {
            return View();
        }
    }
}
