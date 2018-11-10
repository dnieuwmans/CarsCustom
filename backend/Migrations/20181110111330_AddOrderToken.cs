using Microsoft.EntityFrameworkCore.Migrations;

namespace backend.Migrations
{
    public partial class AddOrderToken : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Token",
                table: "Orders",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Token",
                table: "Orders");
        }
    }
}
