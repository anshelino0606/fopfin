using fopfin.Domain.Entities;

namespace fopfin.Application.Interfaces
{
    public interface IAuthService
    {
        Task<string> LoginWithOAuth(string provider, string token);
        Task<string> LoginWithEmail(string email, string password);
        Task<(string accessToken, string refreshToken)> GenerateTokens(User user);
        Task<string> RefreshToken(string refreshToken);
    }
}