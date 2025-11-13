using HrWebRecruitment.Services;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
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

        [HttpGet("GetHiring")]
        public async Task<string> GetHiring()
        {
            return await dbService.GetHirings();
        }

        [HttpGet("GetUsers")]
        public async Task<string> GetUsers()
        {
            return await dbService.GetUsers();
        }

        [HttpGet("GetEmployees")]
        public async Task<string> GetEmployees()
        {
            return await dbService.GetEmployees();
        }

        [HttpGet("GetDictionary")]
        public async Task<string> GetDictionary()
        {
            return dbService.GetDictionary().ToJson();
        }

        [HttpGet("GetStatuses")]
        public async Task<string> GetStatuses()
        {
            return await dbService.GetStatuses();
        }
    }
}
