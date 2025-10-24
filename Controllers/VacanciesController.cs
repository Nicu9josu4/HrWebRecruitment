using HrWebRecruitment.Services;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace HrWebRecruitment.Controllers
{
    public class VacanciesController(DbService dbService) : Controller
    {
        public async Task<string> Get()
        {
            return JsonConvert.SerializeObject(await dbService.GetVacancies());
            //app.MapPost("/getVacancies", async (ModelContext db) =>
            //{
            //    try
            //    {
            //        var vacancies = db.Vacancies.ToList();
            //        string json = JsonConvert.SerializeObject(vacancies);
            //        await Task.Delay(100);
            //        return json;
            //    }
            //    catch (Exception ex)
            //    {
            //        logger.LogError(ex.Message + " " + ex.StackTrace);
            //        return ex.Message;
            //    }
            //});
        }
    }
}
