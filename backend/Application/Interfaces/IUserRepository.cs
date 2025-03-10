using System.Threading.Tasks;
using fopfin.Domain.Entities;
using fopfin.Domain.ValueObjects;

namespace fopfin.Application.Interfaces
{
    public interface IUserRepository
    {
        Task<User> FindByEmail(Email email);
    }
}
