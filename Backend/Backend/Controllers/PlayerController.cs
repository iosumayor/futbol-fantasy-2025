using Microsoft.AspNetCore.Mvc;
using Backend.Models;

namespace Backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PlayerController : ControllerBase
    {
        private readonly AppDbContext _context;

        public PlayerController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet(Name = "GetPlayers")]
        public IEnumerable<Player> Get()
        {
            return _context.Players.ToList();
        }
    }
}