using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UptimeDaddy.API.Data;
using UptimeDaddy.API.DTOs;
using UptimeDaddy.API.Models;

namespace UptimeDaddy.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class WebsitesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public WebsitesController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var websites = await _context.Websites.ToListAsync();
            return Ok(websites);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateWebsiteDto dto)
        {
            var accountExists = await _context.Users.AnyAsync(u => u.Id == dto.UserId);

            if (!accountExists)
            {
                return BadRequest("Account findes ikke.");
            }

            var website = new Website
            {
                Url = dto.Url,
                IntervalTime = dto.IntervalTime,
                UserId = dto.UserId
            };

            _context.Websites.Add(website);
            await _context.SaveChangesAsync();

            return Ok(website);
        }
    }
}