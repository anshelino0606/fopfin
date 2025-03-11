using fopfin.Application.Interfaces;
using fopfin.Domain.Entities;
using fopfin.Domain.ValueObjects;

namespace fopfin.Infrastructure.Persistence {
    public class UserRepository : IUserRepository
    {
        private readonly AppDbContext _context;

        public UserRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<User> FindByEmail(Email email)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.Email.Value == email.Value);
        }
    }
}