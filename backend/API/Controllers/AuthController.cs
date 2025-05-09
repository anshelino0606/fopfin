using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using fopfin.Application.Interfaces;
using fopfin.API.DTOs;

[Route("api/auth")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("login-oauth")]
    public async Task<IActionResult> LoginWithOAuth([FromBody] OAuthRequest request)
    {
        var token = await _authService.LoginWithOAuth(request.Provider, request.Token);
        return Ok(new { Token = token });
    }

    [HttpPost("login-email")]
    public async Task<IActionResult> LoginWithEmail([FromBody] LoginRequest request)
    {
        var token = await _authService.LoginWithEmail(request.Email, request.Password);
        return Ok(new { Token = token });
    }

    [HttpPost("refresh-token")]
    public async Task<IActionResult> RefreshToken([FromBody] RefreshTokenRequest request)
    {
        var newToken = await _authService.RefreshToken(request.RefreshToken);
        return Ok(new { Token = newToken });
    }
}
