using HrWebRecruitment.Services;
using Microsoft.AspNetCore.Mvc;

namespace HrWebRecruitment.Controllers
{
    public class AdminController(DbService dbService) : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
