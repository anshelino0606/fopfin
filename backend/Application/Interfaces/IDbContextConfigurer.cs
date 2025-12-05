using Microsoft.EntityFrameworkCore;

namespace fopfin.Application.Interfaces
{
    // Цей інтерфейс визначає контракт для налаштування бази даних.
    // Ми не знаємо, чи це Postgres, чи SQL Server.
    public interface IDbContextConfigurer
    {
        void Configure(DbContextOptionsBuilder options, string connectionString);
    }
}

