using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using fopfin.Application.Interfaces;
using fopfin.Application.Services;
using fopfin.Infrastructure.Persistence;
using fopfin.Infrastructure.Auth;

namespace fopfin.API.Configurations
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services)
        {
            // Register Application Services
            services.AddScoped<IAuthService, AuthService>();
            services.AddScoped<IPasswordHasher, PasswordHasher>();
            services.AddScoped<ITaxReportService, TaxReportService>();

            return services;
        }

        public static IServiceCollection AddInfrastructureServices(this IServiceCollection services, IConfiguration configuration)
        {
            // --- РЕАЛІЗАЦІЯ ADR 001: DB ADAPTER ---

            // 1. Реєструємо наш адаптер. 
            // Це дозволяє легко замінити PostgreSqlConfigurer на SqlServerConfigurer у майбутньому
            services.AddSingleton<IDbContextConfigurer, PostgreSqlConfigurer>();

            // 2. Налаштовуємо DbContext, використовуючи адаптер
            services.AddDbContext<AppDbContext>((serviceProvider, options) =>
            {
                // Отримуємо адаптер з контейнера
                var configurer = serviceProvider.GetRequiredService<IDbContextConfigurer>();

                // Отримуємо рядок підключення з перевіркою на null
                // Якщо рядка немає в конфігах, програма викине зрозумілу помилку замість NullReferenceException
                var connectionString = configuration.GetConnectionString("DefaultConnection")
                    ?? throw new InvalidOperationException("Connection string 'DefaultConnection' not found in configuration.");

                // Делегуємо налаштування адаптеру
                configurer.Configure(options, connectionString);
            });

            // ----------------------------------------

            // Repositories
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<ITransactionRepository, TransactionRepository>();

            // Authentication Services
            services.AddScoped<IJwtService, JwtService>();

            return services;
        }
    }
}