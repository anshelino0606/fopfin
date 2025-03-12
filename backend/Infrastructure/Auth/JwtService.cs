using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using fopfin.Application.Interfaces;
using fopfin.Domain.Entities;

namespace fopfin.Infrastructure.Auth {
    public class JwtService : IJwtService
    {
        private readonly IConfiguration _config;

        public JwtService(IConfiguration config)
        {
            _config = config;
        }

        public string GenerateToken(User user)
        {
            var secretKey = _config["Jwt:Secret"] ?? throw new ArgumentNullException("Jwt:Secret is not configured");
            var issuer = _config["Jwt:Issuer"] ?? throw new ArgumentNullException("Jwt:Issuer is not configured");
            var audience = _config["Jwt:Audience"] ?? throw new ArgumentNullException("Jwt:Audience is not configured");

            var claims = new[]
            {
                new Claim(ClaimTypes.Email, user.Email.Value),
                new Claim(ClaimTypes.Role, user.Role.ToString())
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(
                issuer: issuer,
                audience: audience,
                claims: claims,
                expires: DateTime.UtcNow.AddHours(2),
                signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}