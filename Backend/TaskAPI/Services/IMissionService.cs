using MissionAPI.Dtos;
namespace MissionAPI.Services;
public interface IMissionService
{
    Task<IEnumerable<MissionDto>> GetAllAsync(string? search =
   null);
    Task<MissionDto?> GetOneAsync(int id);
    Task<MissionDto> CreateAsync(CreateMissionDto input);
    Task<bool> UpdateAsync(int id, UpdateMissionDto input);
    Task<bool> DeleteAsync(int id);
}
