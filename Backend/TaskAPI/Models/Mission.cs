namespace MissionAPI.Models;

public class Mission
{
    public int Id { get; set; }
    public string Name { get; set; } = default!;
    public DateOnly Due { get; set; }
    public DateOnly Summit { get; set; }
    public string Status { get; set; } = default!;
}