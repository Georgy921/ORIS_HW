using Microsoft.AspNetCore.Mvc;
using ToursAPI.DataBase;

using Microsoft.EntityFrameworkCore;
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
            var tours = await db.Tours.ToListAsync();
            if(tours == null) return NotFound(new { message = "Туры не найдены" });
            return Ok(tours);
        }

        // GET: ToursController/Details/5
        [HttpGet("tours/{id}")]
        public async Task<ActionResult<Tour>> GetTourById(int id, [FromServices] AppDbContext db)
        {
            var tour = await db.Tours.FindAsync(id);

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
    }
}
