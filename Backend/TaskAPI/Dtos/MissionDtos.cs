namespace MissionAPI.Dtos;
public record MissionDto(int Id, string Name, DateTime Due, DateTime Summit, string Status);
public class CreateMissionDto
{
    public string Name { get; set; } = default!;
    public DateOnly Due { get; set; };
    public 
}
public class UpdateMissionDto
{
    public string Name { get; set; } = default!;
    public DateOnly Due { get; set; }
    public DateOnly Summit { get; set; }
    public string Status { get; set; } = default!;
}
