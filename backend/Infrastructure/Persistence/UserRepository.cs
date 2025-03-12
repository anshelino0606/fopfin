using fopfin.Application.Interfaces;
using fopfin.Domain.Entities;
using fopfin.Domain.ValueObjects;
using Microsoft.EntityFrameworkCore; // ✅ Required for FirstOrDefaultAsync

namespace fopfin.Infrastructure.Persistence {
    public class UserRepository : IUserRepository
    {
        private readonly AppDbContext _context;

        public UserRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<User?> FindByEmail(Email email)
        {
            return await _context.Users
                .FirstOrDefaultAsync(u => u.Email.Value == email.Value);
        }

        public async Task<User?> FindByOAuth(string provider, string oauthId)
        {
            return await _context.Users
                .FirstOrDefaultAsync(u => u.Provider == provider && u.OAuthId == oauthId);
        }

        public async Task<User?> FindByRefreshToken(string refreshToken)
        {
            return await _context.Users
                .FirstOrDefaultAsync(u => u.RefreshToken == refreshToken);
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}