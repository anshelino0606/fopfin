using fopfin.Application.Interfaces;
using fopfin.Domain.Entities;
using fopfin.Domain.ValueObjects;

namespace fopfin.Application.Services {
    public class AuthService : IAuthService
    {
        private readonly IUserRepository _userRepository;
        private readonly IJwtService _jwtService;
        private readonly IPasswordHasher _passwordHasher;

        public AuthService(
            IUserRepository userRepository, 
            IJwtService jwtService,
            IPasswordHasher passwordHasher)
        {
            _userRepository = userRepository;
            _jwtService = jwtService;
            _passwordHasher = passwordHasher;
        }

        public async Task<string> LoginWithOAuth(string provider, string token)
        {
            var user = await _userRepository.FindByOAuth(provider, token);
            if (user == null) throw new UnauthorizedAccessException("Invalid OAuth login");

            return _jwtService.GenerateToken(user);
        }

        public async Task<string> LoginWithEmail(string email, string password)
        {
            var user = await _userRepository.FindByEmail(new Email(email));
            if (user == null || string.IsNullOrEmpty(user.PasswordHash) || !_passwordHasher.Verify(password, user.PasswordHash))
                throw new UnauthorizedAccessException("Invalid credentials");

            return _jwtService.GenerateToken(user);
        }

        public async Task<(string accessToken, string refreshToken)> GenerateTokens(User user)
        {
            string accessToken = _jwtService.GenerateToken(user);
            string refreshToken = Guid.NewGuid().ToString(); // Store in DB later

            return await Task.FromResult((accessToken, refreshToken)); // ✅ Wrap it in Task
        }

        public async Task<string> RefreshToken(string refreshToken)
        {
            // TODO: Implement refresh token validation against DB
            var user = await _userRepository.FindByRefreshToken(refreshToken);
            if (user == null) throw new UnauthorizedAccessException("Invalid refresh token");

            return _jwtService.GenerateToken(user);
        }
    }
}
