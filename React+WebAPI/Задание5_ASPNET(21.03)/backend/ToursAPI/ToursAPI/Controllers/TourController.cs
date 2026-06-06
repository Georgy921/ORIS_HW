using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;
using ToursAPI.DataBase;
using ToursAPI.Model;

namespace ToursAPI.Controllers
{
    [ApiController]
    [Route("api")]
    public class ToursController : ControllerBase
    {
        // GET: ToursController
        [HttpGet("tours")]
        [HttpGet("")]
        public async Task<ActionResult<List<Tour?>>> GetTours([FromServices] AppDbContext db)
        {
            /*var tours = await db.Tours.ToListAsync();
            if(tours == null) return NotFound(new { message = "Туры не найдены" });
            return Ok(tours);*/
            var tours = LoadToursFromJson();
            return Ok(tours);
        }

        // GET: ToursController/Details/5
        [HttpGet("tours/{id}")]
        public async Task<ActionResult<Tour>> GetTourById(int id, [FromServices] AppDbContext db)
        {
            /*var tour = await db.Tours.FindAsync(id);

            if (tour == null)
            {
                return NotFound(new { message = $"Тур с ID {id} не найден" });
            }

            return Ok(tour);*/
            var _tours = LoadToursFromJson();
            var tour = _tours.FirstOrDefault<Tour>(t => t.Id == id);

            if (tour == null)
            {
                return NotFound(new { message = $"Тур с ID {id} не найден" });
            }

            return Ok(tour);
        }
        [HttpGet("filters")]
        public async Task<List<FilterSection?>> GetFilters([FromServices] AppDbContext db)
        {
            return await db.FilterSections.ToListAsync();
        }

        /* // GET: ToursController/Create
         public ActionResult Create()
         {
             return View();
         }*/

        /*// POST: ToursController/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }*/

        /*// GET: ToursController/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }*/

        // POST: ToursController/Edit/5
        /*[HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(int id, IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: ToursController/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }*/

        // POST: ToursController/Delete/5
        /*[HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Delete(int id, IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }*/

        private List<Tour> LoadToursFromJson()
        {
            try
            {
                // Путь к файлу tours.json в папке DataSeed
                var jsonPath = "C:\\Users\\aleks\\Desktop\\ORIS\\ORIS_2Sem\\backend\\ToursAPI\\ToursAPI\\Data\\tours.json";

                if (!System.IO.File.Exists(jsonPath))
                {
                    Console.WriteLine("❌ tours.json не найден!");
                    return new List<Tour>();
                }

                var json = System.IO.File.ReadAllText(jsonPath);
                var tours = JsonSerializer.Deserialize<List<Tour>>(json);

                Console.WriteLine($"✅ Загружено {tours?.Count ?? 0} туров из JSON");
                return tours ?? new List<Tour>();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"❌ Ошибка загрузки tours.json: {ex.Message}");
                return new List<Tour>();
            }
        }
    }
}
