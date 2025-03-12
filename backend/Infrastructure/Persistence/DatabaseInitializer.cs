using Microsoft.EntityFrameworkCore;

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
        }
    }
}