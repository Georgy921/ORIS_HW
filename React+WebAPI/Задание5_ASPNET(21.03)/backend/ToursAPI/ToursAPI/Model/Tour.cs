using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace ToursAPI.Model
{
    public class Tour
    {
        [JsonPropertyName("id")]
        public int Id { get; set; }

        [JsonPropertyName("name")]
        public string Name { get; set; }

        [JsonPropertyName("arrival_city")]
        public string ArrivalCity { get; set; }

        [JsonPropertyName("departure_city")]
        public string DepartureCity { get; set; }

        [JsonPropertyName("departure_date")]
        public string DepartureDate { get; set; }

        [JsonPropertyName("nights_count")]
        public int NightsCount { get; set; }

        [JsonPropertyName("adults_count")]
        public int AdultsCount { get; set; }

        [Column(TypeName = "decimal(8,2)")]
        [JsonPropertyName("tour_price")]
        public decimal TourPrice { get; set; }

        [JsonPropertyName("image_url")]
        public string ImageUrl { get; set; }

        [JsonPropertyName("bonus")]
        public int Bonus { get; set; }

        [JsonPropertyName("wifi")]
        public string Wifi { get; set; }

        [JsonPropertyName("distance_to_airport")]
        public int DistanceToAirport { get; set; }

        [JsonPropertyName("general_description")]
        public string GeneralDescription { get; set; }

        [JsonPropertyName("has_kids_club")]
        public bool HasKidsClub { get; set; }

        [JsonPropertyName("hotel_name")]
        public string HotelName { get; set; }

        [JsonPropertyName("has_aquapark")]
        public bool HasAquapark { get; set; }

        [JsonPropertyName("has_spa")]
        public bool HasSpa { get; set; }

        [JsonPropertyName("room_type")]
        public string RoomType { get; set; }

        [JsonPropertyName("popular_filters")]
        public string PopularFilters { get; set; }

        [JsonPropertyName("region")]
        public string Region { get; set; }

        [JsonPropertyName("rating")]
        public int Rating { get; set; }

        [JsonPropertyName("meal_plan")]
        public string MealPlan { get; set; }

        // ✅ Вычисляемое поле — атрибут НЕ нужен (его нет в JSON)
        public int MonthlyPayment { get { return (int)TourPrice / 6; } }

        // ✅ Вычисляемое поле — атрибут НЕ нужен
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