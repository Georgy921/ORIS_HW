using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ToursAPI.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "FilterSections",
                columns: table => new
                {
                    Key = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Type = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Items = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FilterSections", x => x.Key);
                });

            migrationBuilder.CreateTable(
                name: "Tours",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ArrivalCity = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    DepartureCity = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DepartureDate = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    NightsCount = table.Column<int>(type: "int", nullable: false),
                    AdultsCount = table.Column<int>(type: "int", nullable: false),
                    TourPrice = table.Column<decimal>(type: "decimal(8,2)", nullable: false),
                    ImageUrl = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Bonus = table.Column<int>(type: "int", nullable: false),
                    Wifi = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DistanceToAirport = table.Column<int>(type: "int", nullable: false),
                    GeneralDescription = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    HasKidsClub = table.Column<bool>(type: "bit", nullable: false),
                    HotelName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    HasAquapark = table.Column<bool>(type: "bit", nullable: false),
                    HasSpa = table.Column<bool>(type: "bit", nullable: false),
                    RoomType = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PopularFilters = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Region = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Rating = table.Column<int>(type: "int", nullable: false),
                    MealPlan = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tours", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_FilterSections_Type",
                table: "FilterSections",
                column: "Type");

            migrationBuilder.CreateIndex(
                name: "IX_Tours_ArrivalCity",
                table: "Tours",
                column: "ArrivalCity");

            migrationBuilder.CreateIndex(
                name: "IX_Tours_MealPlan",
                table: "Tours",
                column: "MealPlan");

            migrationBuilder.CreateIndex(
                name: "IX_Tours_Rating",
                table: "Tours",
                column: "Rating");

            migrationBuilder.CreateIndex(
                name: "IX_Tours_TourPrice",
                table: "Tours",
                column: "TourPrice");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "FilterSections");

            migrationBuilder.DropTable(
                name: "Tours");
        }
    }
}
