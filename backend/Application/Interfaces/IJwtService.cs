using fopfin.Domain.Entities;

namespace fopfin.Application.Interfaces
{
    public interface IJwtService
    {
        string GenerateToken(User user);
    }
}
