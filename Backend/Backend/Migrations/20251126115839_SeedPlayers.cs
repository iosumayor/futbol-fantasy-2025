using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class SeedPlayers : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Players",
                columns: new[] { "Id", "Image", "ImageDetail", "Name", "Points", "Position", "Price", "ShirtName", "Team" },
                values: new object[,]
                {
                    { 1, "https://assets.laliga.com/squad/2025/t178/p593109/128x128/p593109_t178_2025_1_002_000.jpg", null, "Lamine Yamal", 0, 3, 10m, null, "Barcelona" },
                    { 2, null, null, "Luka Modric", 0, 2, 12m, null, "Real Madrid" },
                    { 3, "https://assets.laliga.com/squad/2025/t178/p77318/128x128/p77318_t178_2025_1_002_000.jpg", "https://r2.thesportsdb.com/images/media/player/render/agtip81658424227.png/small", "Marc-André ter Stegen", 0, 0, 9m, null, "Barcelona" },
                    { 4, "https://assets.laliga.com/squad/2025/t186/p244855/128x128/p244855_t186_2025_1_002_000.jpg", null, "Jude Bellingham", 0, 2, 13m, null, "Real Madrid" },
                    { 5, null, null, "Antoine Griezmann", 0, 3, 11m, null, "Atlético de Madrid" },
                    { 6, "https://assets.laliga.com/squad/2025/t175/p81352/128x128/p81352_t175_2025_1_002_000.jpg", null, "Jan Oblak", 0, 0, 9m, null, "Atlético de Madrid" },
                    { 7, "https://assets.laliga.com/squad/2025/t185/p80209/128x128/p80209_t185_2025_1_002_000.jpg", null, "Isco", 0, 2, 8m, null, "Real Betis" },
                    { 8, null, null, "Borja Iglesias", 0, 3, 8m, null, "Real Betis" },
                    { 9, null, null, "Unai Simón", 0, 0, 8m, null, "Athletic Club" },
                    { 10, "https://assets.laliga.com/squad/2025/t174/p197334/128x128/p197334_t174_2025_1_002_000.jpg", null, "Iñaki Williams", 0, 3, 9m, null, "Athletic Club" },
                    { 11, null, null, "Takefusa Kubo", 0, 3, 8m, null, "Real Sociedad" },
                    { 12, null, null, "Mikel Merino", 0, 2, 8m, null, "Real Sociedad" },
                    { 13, null, null, "Álex Remiro", 0, 0, 7m, null, "Real Sociedad" },
                    { 14, null, null, "Gerard Moreno", 0, 3, 9m, null, "Villarreal" },
                    { 15, null, null, "Dani Parejo", 0, 2, 8m, null, "Villarreal" },
                    { 16, null, null, "Álvaro Valles", 0, 0, 7m, null, "Las Palmas" },
                    { 17, null, null, "Jonathan Viera", 0, 2, 7m, null, "Las Palmas" },
                    { 18, null, null, "Enes Ünal", 0, 3, 7m, null, "Getafe" },
                    { 19, null, null, "David Soria", 0, 0, 7m, null, "Getafe" },
                    { 20, null, null, "Joselu", 0, 3, 8m, null, "Real Madrid" },
                    { 21, "https://assets.laliga.com/squad/2025/t178/p490541/128x128/p490541_t178_2025_1_002_000.jpg", null, "Pedri", 0, 2, 10m, null, "Barcelona" },
                    { 22, "https://assets.laliga.com/squad/2025/t178/p56764/128x128/p56764_t178_2025_1_002_000.jpg", null, "Robert Lewandowski", 0, 3, 12m, null, "Barcelona" },
                    { 23, null, null, "Koke", 0, 2, 8m, null, "Atlético de Madrid" },
                    { 24, null, null, "Ángel Correa", 0, 3, 8m, null, "Atlético de Madrid" },
                    { 25, null, null, "Claudio Bravo", 0, 0, 7m, null, "Real Betis" },
                    { 26, "https://assets.laliga.com/squad/2025/t185/p441303/128x128/p441303_t185_2025_1_002_000.jpg", null, "Aitor Ruibal", 0, 1, 7m, null, "Real Betis" },
                    { 27, "https://assets.laliga.com/squad/2025/t174/p197319/128x128/p197319_t174_2025_1_002_000.jpg", null, "Yeray Álvarez", 0, 1, 7m, null, "Athletic Club" },
                    { 28, null, null, "Mikel Oyarzabal", 0, 3, 8m, null, "Real Sociedad" },
                    { 29, null, null, "Pau Torres", 0, 1, 7m, null, "Villarreal" },
                    { 30, null, null, "Sergio Herrera", 0, 0, 7m, null, "Osasuna" },
                    { 31, "https://assets.laliga.com/squad/2025/t191/p132105/128x128/p132105_t191_2025_1_002_000.jpg", null, "José Gayà", 0, 1, 7m, null, "Valencia" },
                    { 32, "https://assets.laliga.com/squad/2025/t2893/p517333/128x128/p517333_t2893_2025_1_002_000.jpg", null, "Arnau Martínez", 0, 1, 7m, null, "Girona" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Players",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Players",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Players",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Players",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Players",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Players",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "Players",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "Players",
                keyColumn: "Id",
                keyValue: 8);

            migrationBuilder.DeleteData(
                table: "Players",
                keyColumn: "Id",
                keyValue: 9);

            migrationBuilder.DeleteData(
                table: "Players",
                keyColumn: "Id",
                keyValue: 10);

            migrationBuilder.DeleteData(
                table: "Players",
                keyColumn: "Id",
                keyValue: 11);

            migrationBuilder.DeleteData(
                table: "Players",
                keyColumn: "Id",
                keyValue: 12);

            migrationBuilder.DeleteData(
                table: "Players",
                keyColumn: "Id",
                keyValue: 13);

            migrationBuilder.DeleteData(
                table: "Players",
                keyColumn: "Id",
                keyValue: 14);

            migrationBuilder.DeleteData(
                table: "Players",
                keyColumn: "Id",
                keyValue: 15);

            migrationBuilder.DeleteData(
                table: "Players",
                keyColumn: "Id",
                keyValue: 16);

            migrationBuilder.DeleteData(
                table: "Players",
                keyColumn: "Id",
                keyValue: 17);

            migrationBuilder.DeleteData(
                table: "Players",
                keyColumn: "Id",
                keyValue: 18);

            migrationBuilder.DeleteData(
                table: "Players",
                keyColumn: "Id",
                keyValue: 19);

            migrationBuilder.DeleteData(
                table: "Players",
                keyColumn: "Id",
                keyValue: 20);

            migrationBuilder.DeleteData(
                table: "Players",
                keyColumn: "Id",
                keyValue: 21);

            migrationBuilder.DeleteData(
                table: "Players",
                keyColumn: "Id",
                keyValue: 22);

            migrationBuilder.DeleteData(
                table: "Players",
                keyColumn: "Id",
                keyValue: 23);

            migrationBuilder.DeleteData(
                table: "Players",
                keyColumn: "Id",
                keyValue: 24);

            migrationBuilder.DeleteData(
                table: "Players",
                keyColumn: "Id",
                keyValue: 25);

            migrationBuilder.DeleteData(
                table: "Players",
                keyColumn: "Id",
                keyValue: 26);

            migrationBuilder.DeleteData(
                table: "Players",
                keyColumn: "Id",
                keyValue: 27);

            migrationBuilder.DeleteData(
                table: "Players",
                keyColumn: "Id",
                keyValue: 28);

            migrationBuilder.DeleteData(
                table: "Players",
                keyColumn: "Id",
                keyValue: 29);

            migrationBuilder.DeleteData(
                table: "Players",
                keyColumn: "Id",
                keyValue: 30);

            migrationBuilder.DeleteData(
                table: "Players",
                keyColumn: "Id",
                keyValue: 31);

            migrationBuilder.DeleteData(
                table: "Players",
                keyColumn: "Id",
                keyValue: 32);
        }
    }
}
