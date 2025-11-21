using MissionAPI.Dtos;
using MissionAPI.Models;
using MissionAPI.Repositories;
namespace MissionAPI.Services;
public class MissionService : IMissionService
{
    private readonly IMissionRepository _repo;
    public MissionService(IMissionRepository repo) => _repo = repo;
    public async Task<IEnumerable<MissionDto>>
    GetAllAsync(string? search = null)
    {
        var list = await _repo.ListAsync(
        string.IsNullOrWhiteSpace(search) ? null : s => s.Name.Contains(search!)
        );
        return list.Select(ToDto);
    }
    public async Task<MissionDto?> GetOneAsync(int id)
    {
        var s = await _repo.GetByIdAsync(id);
        return s is null ? null : ToDto(s);
    }
    public async Task<MissionDto> CreateAsync(CreateMissionDto input)
    {
        if (string.IsNullOrWhiteSpace(input.Name))
            throw new ArgumentException("Name is required");

        if (await _repo.ExistsByNameAsync(input.Name.Trim()))
            throw new InvalidOperationException("Mission already exists");


        var entity = new Mission
        {
            Name = input.Name.Trim(),
            Due = input.Due,
            Status = "Chưa làm"
        };
        await _repo.AddAsync(entity);
        await _repo.SaveChangesAsync();
        return ToDto(entity);
    }
    public async Task<bool> UpdateAsync(int id, UpdateMissionDto input)
    {
        var exists = await _repo.GetByIdAsync(id);
        if (exists is null) return false;
        exists.Name = input.Name;
        exists.Due = input.Due;
        exists.Summit = input.Summit;
        exists.Status = input.Status;
        _repo.Update(exists);
        await _repo.SaveChangesAsync();
        return true;
    }
    public async Task<bool> DeleteAsync(int id)
    {
        var exists = await _repo.GetByIdAsync(id);
        if (exists is null) return false;
        _repo.Remove(exists);
        await _repo.SaveChangesAsync();
        return true;
    }
    private static MissionDto ToDto(Mission s) => new MissionDto(s.Id, s.Name, s.Due, s.Summit, s.Status);
}