namespace fopfin.Infrastructure.Persistence
{
    public static class DatabaseInitializer
    {
        public static void Initialize(AppDbContext context)
        {
            context.Database.Migrate();

            var sqlFilePath = "Migrations/schema.sql";
            if (File.Exists(sqlFilePath))
            {
                var sql = File.ReadAllText(sqlFilePath);
                context.Database.ExecuteSqlRaw(sql);
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
