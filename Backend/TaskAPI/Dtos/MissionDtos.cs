namespace MissionAPI.Dtos;
public record MissionDto(int Id, string Name, DateOnly Due, DateOnly Summit, string Status);
public class CreateMissionDto
{
    public string Name { get; set; } = default!;
    public DateOnly Due { get; set; }
}
public class UpdateMissionDto
{
    public string Name { get; set; } = default!;
    public DateOnly Due { get; set; }
    public DateOnly Summit { get; set; }
    public string Status { get; set; } = default!;
}
