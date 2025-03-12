using System.Threading.Tasks;
using fopfin.Domain.Entities;
using fopfin.Domain.ValueObjects;

namespace fopfin.Application.Interfaces
{
    public interface IUserRepository
    {
        Task<User?> FindByEmail(Email email);
        Task<User?> FindByOAuth(string provider, string oauthId);
        Task<User?> FindByRefreshToken(string refreshToken);
        Task SaveChangesAsync();
    }
}