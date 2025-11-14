using MissionAPI.Models;
namespace MissionAPI.Repositories;
public interface IMissionRepository : IRepository<Mission>
{
    Task<bool> ExistsByNameAsync(string Name);
}
