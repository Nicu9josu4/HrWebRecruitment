using HrWebRecruitment.Services;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace HrWebRecruitment.Controllers
{
    [Route("[controller]")]
    public class AdminController(DbService dbService) : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        [HttpGet("GetVacancy")]
        public async Task<string> GetVacancy()
        {
            return JsonConvert.SerializeObject(await dbService.GetVacancies());
        }

        public async Task<string> GetHiring()
        {
            return await dbService.GetHirings();
        }
    }
}
