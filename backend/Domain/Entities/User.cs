using System;
using fopfin.Domain.ValueObjects;
using fopfin.Domain.Enums;

namespace fopfin.Domain.Entities
{
    public class User
    {
        public Guid Id { get; private set; } = Guid.NewGuid();

        // 🔹 Backing field for EF Core mapping
        private string _email = string.Empty;
        public Email Email
        {
            get => new Email(_email); // Convert string to Email object
            private set => _email = value.Value; // Convert Email to string
        }

        public string? PasswordHash { get; private set; }
        public Role Role { get; private set; }
        public TaxGroup TaxGroup { get; private set; }
        public string? RefreshToken { get; set; }

        // OAuth-related properties
        public string? Provider { get; private set; }
        public string? Token { get; private set; }
        public string? OAuthId { get; set; }

        private User() { } // ✅ Required for EF Core

        public User(Email email, string passwordHash, Role role, TaxGroup taxGroup)
        {
            Email = email;
            PasswordHash = passwordHash ?? throw new ArgumentNullException(nameof(passwordHash));
            Role = role;
            TaxGroup = taxGroup;
        }
        
        public User(Email email, string provider, string oauthId, Role role, TaxGroup taxGroup)
        {
            Email = email;
            Provider = provider ?? throw new ArgumentNullException(nameof(provider));
            OAuthId = oauthId ?? throw new ArgumentNullException(nameof(oauthId));
            Role = role;
            TaxGroup = taxGroup;
        }
    }
}