namespace fopfin.API.DTOs
{
    public class OAuthRequest
    {
        public string Provider { get; set; }
        public string Token { get; set; }
    }

    public class LoginRequest
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
