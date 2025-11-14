using Microsoft.EntityFrameworkCore;
using MissionAPI.Data;
using MissionAPI.Models;
using System.Linq.Expressions;
namespace MissionAPI.Repositories;
public class MissionRepository : IMissionRepository
{
    private readonly AppDbContext _db;
    public MissionRepository(AppDbContext db) => _db = db;
    public async Task<Mission?> GetByIdAsync(int id) =>
    await _db.Missions.AsNoTracking().FirstOrDefaultAsync(s => s.Id == id);
    public async Task<IReadOnlyList<Mission>>
   ListAsync(Expression<Func<Mission, bool>>? predicate = null)
    {
        IQueryable<Mission> query = _db.Missions.AsNoTracking();
        if (predicate != null)
            query = query.Where(predicate);
        return await query.OrderByDescending(s => s.Due).ToListAsync();
    }
    public async Task AddAsync(Mission entity) => await
   _db.Missions.AddAsync(entity);
    public void Update(Mission entity) =>
   _db.Missions.Update(entity);
    public void Remove(Mission entity) =>
   _db.Missions.Remove(entity);
    public Task<int> SaveChangesAsync() =>
   _db.SaveChangesAsync();
    public Task<bool> ExistsByNameAsync(string Name) =>
    _db.Missions.AnyAsync(s => s.Name == Name);
}