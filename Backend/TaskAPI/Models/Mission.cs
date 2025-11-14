namespace MissionAPI.Models;

public class Mission
{
    public int Id { get; set; }
    public string Name { get; set; } = default!;
    public DateTime Due { get; set; }
    public DateTime Summit { get; set; }
    public string Status { get; set; } = default!;
}