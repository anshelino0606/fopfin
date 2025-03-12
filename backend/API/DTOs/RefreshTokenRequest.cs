using System.ComponentModel.DataAnnotations;

namespace fopfin.API.DTOs
{
    public class RefreshTokenRequest
    {
        [Required]
        public string RefreshToken { get; set; } = string.Empty; // ✅ Prevents null
    }
}
