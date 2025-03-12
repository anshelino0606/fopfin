using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using fopfin.Domain.Entities;
using fopfin.Domain.ValueObjects;

namespace fopfin.API.Configurations
{
    public class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.HasKey(u => u.Id);

            // ✅ Configure Email as an owned type (no separate table, stored in User)
            builder.OwnsOne(u => u.Email, emailBuilder =>
            {
                emailBuilder.Property(e => e.Value)
                    .HasColumnName("Email") // Ensure correct column name
                    .IsRequired();
            });

            builder.Property(u => u.PasswordHash)
                .IsRequired(false);

            builder.Property(u => u.Provider)
                .IsRequired(false);

            builder.Property(u => u.OAuthId)
                .IsRequired(false);

            builder.Property(u => u.RefreshToken)
                .IsRequired(false);
        }
    }
}