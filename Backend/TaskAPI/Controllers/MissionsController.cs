using Microsoft.AspNetCore.Mvc;
using MissionAPI.Dtos;
using MissionAPI.Services;
namespace MissionAPI.Controllers;
[ApiController]
[Route("API/[controller]")]
public class MissionsController : ControllerBase
{
    private readonly IMissionService _service;
    public MissionsController(IMissionService service) => _service = service;
    [HttpGet]
    public async Task<ActionResult<IEnumerable<MissionDto>>>
    GetAll([FromQuery] string? search = null) => Ok(await _service.GetAllAsync(search));
    [HttpGet("{id:int}")]
    public async Task<ActionResult<MissionDto>> GetOne(int id)
    {
        var dto = await _service.GetOneAsync(id);
        return dto is null ? NotFound() : Ok(dto);
    }
    [HttpPost]
    public async Task<ActionResult<MissionDto>>
    Create([FromBody] CreateMissionDto input)
    {
        try
        {
            var dto = await _service.CreateAsync(input);
            return CreatedAtAction(nameof(GetOne), new
            {
                id =
           dto.Id
            }, dto);
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }
    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, [FromBody] UpdateMissionDto input)
    {
        var ok = await _service.UpdateAsync(id, input);
        return ok ? NoContent() : NotFound();
    }
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var ok = await _service.DeleteAsync(id);
        return ok ? NoContent() : NotFound();
    }
}
