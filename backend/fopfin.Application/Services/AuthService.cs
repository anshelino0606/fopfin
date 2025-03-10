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
        if (user == null || !_passwordHasher.Verify(password, user.PasswordHash))
            throw new UnauthorizedAccessException("Invalid credentials");

        return _jwtService.GenerateToken(user);
    }
}
