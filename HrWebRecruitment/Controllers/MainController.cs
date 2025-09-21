using Microsoft.AspNetCore.Mvc;

namespace HrWebRecruitment.Controllers
{
    public class MainController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
