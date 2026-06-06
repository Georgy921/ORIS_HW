using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace ToursAPI.Model
{
    // ==========================================
    // 1. Классы, соответствующие таблицам БД
    // ==========================================

    public class Tour
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string ArrivalCity { get; set; }
        public string DepartureCity { get; set; }
        public string DepartureDate { get; set; }
        public int NightsCount { get; set; }
        public int AdultsCount { get; set; }
        [Column(TypeName = "decimal(8,2)")]
        public decimal TourPrice { get; set; }
        public string ImageUrl { get; set; }
        public int Bonus { get; set; }
        public string Wifi { get; set; }
        public int DistanceToAirport { get; set; }
        public string GeneralDescription { get; set; }
        public bool HasKidsClub { get; set; }
        public string HotelName { get; set; }
        public bool HasAquapark { get; set; }
        public bool HasSpa { get; set; }
        public string RoomType { get; set; }
        public string PopularFilters { get; set; }
        public string Region { get; set; }
        public int Rating { get; set; }
        public string MealPlan { get; set; }
        public  int MonthlyPayment { get { return (int)TourPrice / 6; } }



        public string StarsDisplay
        {
            get
            {
                var stars = "";
                for (int i = 1; i <= 5; i++)
                    stars += i <= Rating ? "★" : "☆";
                return stars;
            }
        }
    }
}