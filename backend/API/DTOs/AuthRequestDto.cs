using System.ComponentModel.DataAnnotations;

namespace fopfin.API.DTOs
{
    public class OAuthRequest
    {
        [Required]
        public string Provider { get; set; } = string.Empty; // ✅ Prevents null

        [Required]
        public string Token { get; set; } = string.Empty; // ✅ Prevents null
    }

    public class LoginRequest
    {
        [Required]
        public string Email { get; set; } = string.Empty; // ✅ Prevents null

        [Required]
        public string Password { get; set; } = string.Empty; // ✅ Prevents null
    }
}