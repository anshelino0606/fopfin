using System.IO;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure; // ✅ Required for `DatabaseFacade`
using fopfin.Domain.Enums;
using fopfin.Domain.ValueObjects;
using fopfin.Domain.Entities;

namespace fopfin.Infrastructure.Persistence
{
    public static class DatabaseInitializer
    {
        public static void Initialize(AppDbContext context)
        {
            context.Database.Migrate(); // ✅ Ensure EF Core is installed

            var sqlFilePath = "Migrations/schema.sql";
            if (File.Exists(sqlFilePath))
            {
                var sql = File.ReadAllText(sqlFilePath);
                context.Database.ExecuteSqlRaw(sql); // ✅ Ensure EF Core is installed
            }

            SeedData(context);
        }

        private static void SeedData(AppDbContext context)
        {
            if (!context.Users.Any())
            {
                context.Users.Add(new User(
                    new Email("admin@example.com"),
                    "hashedpassword",
                    Role.Admin,
                    TaxGroup.Individual
                ));

                context.SaveChanges();
            }
        }
    }
}