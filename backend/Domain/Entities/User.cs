using System;
using fopfin.Domain.ValueObjects;
using fopfin.Domain.Enums;

namespace fopfin.Domain.Entities
{
    public class User
    {
        public Guid Id { get; private set; } = Guid.NewGuid();
        public Email Email { get; private set; }
        public string? PasswordHash { get; private set; } // ✅ Made nullable for OAuth users
        public Role Role { get; private set; }
        public TaxGroup TaxGroup { get; private set; }
        public string? RefreshToken { get; set; }

        // OAuth-related properties
        public string? Provider { get; private set; } // ✅ Made private set
        public string? Token { get; private set; } // ✅ Made private set
        public string? OAuthId { get; set; }

        private User() 
        {
            Email = new Email(""); // ✅ Ensures Email is never null
            PasswordHash = null; // ✅ OAuth users don't need passwords
            Role = Role.Observer; // ✅ Default role (can be changed later)
            TaxGroup = TaxGroup.Individual; // ✅ Default tax group
        } 

        public User(Email email, string passwordHash, Role role, TaxGroup taxGroup)
        {
            Email = email ?? throw new ArgumentNullException(nameof(email));
            PasswordHash = passwordHash ?? throw new ArgumentNullException(nameof(passwordHash));
            Role = role;
            TaxGroup = taxGroup;
        }
        
        public User(Email email, string provider, string oauthId, Role role, TaxGroup taxGroup)
        {
            Email = email ?? throw new ArgumentNullException(nameof(email));
            Provider = provider ?? throw new ArgumentNullException(nameof(provider));
            OAuthId = oauthId ?? throw new ArgumentNullException(nameof(oauthId));
            Role = role;
            TaxGroup = taxGroup;
        }
    }
}