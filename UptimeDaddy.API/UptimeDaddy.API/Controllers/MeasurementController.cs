using Microsoft.AspNetCore.Mvc;
using UptimeDaddy.API.Models;
using UptimeDaddy.API.Data;

[ApiController]
[Route("api/[controller]")]
public class MeasurementsController : ControllerBase
{
    private readonly AppDbContext _context;

    public MeasurementsController(AppDbContext context)
    {
        _context = context;
    }

    [HttpPost]
    public IActionResult Create(Measurement measurement)
    {
        _context.Measurements.Add(measurement);
        _context.SaveChanges();

        return Ok(measurement);
    }

    [HttpGet]
    public IActionResult Get()
    {
        return Ok(_context.Measurements.ToList());
    }
}