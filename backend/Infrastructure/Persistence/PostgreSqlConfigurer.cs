using System;
using Microsoft.EntityFrameworkCore;
using fopfin.Application.Interfaces;

namespace fopfin.Infrastructure.Persistence
{
    // Це наш АДАПТЕР. Він адаптує загальний інтерфейс під конкретний драйвер Npgsql.
    public class PostgreSqlConfigurer : IDbContextConfigurer
    {
        public void Configure(DbContextOptionsBuilder options, string connectionString)
        {
            // 1. Виправляємо проблему з UTC датами в PostgreSQL.
            // Без цього Npgsql викидатиме помилку при спробі зберегти DateTime.Now
            AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);

            // 2. Використовуємо драйвер Npgsql
            options.UseNpgsql(connectionString);
        }
    }
}

