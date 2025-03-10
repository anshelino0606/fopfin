public interface IAuthService
{
    Task<string> LoginWithOAuth(string provider, string token);
    Task<string> LoginWithEmail(string email, string password);
}
