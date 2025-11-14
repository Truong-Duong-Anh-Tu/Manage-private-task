namespace MissionAPI.Dtos;
public record MissionDto(int Id, string Name, DateTime Due, DateTime Summit, string Status);
public class CreateMissionDto
{
    public string Name { get; set; } = default!;
    public DateTime Due { get; set; }
}
public class UpdateMissionDto
{
    public string Name { get; set; } = default!;
    public DateTime Due { get; set; }
    public DateTime Summit { get; set; }
    public string Status { get; set; } = default!;
}
