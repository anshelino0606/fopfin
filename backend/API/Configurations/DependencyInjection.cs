using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;
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
            services.AddScoped<IPdfGeneratorService, PdfGeneratorService>();

            return services;
        }

        public static IServiceCollection AddInfrastructureServices(this IServiceCollection services, IConfiguration configuration)
        {
            // Database Connection (PostgreSQL)
            services.AddDbContext<AppDbContext>(options =>
                options.UseNpgsql(configuration.GetConnectionString("DefaultConnection")));

            // Repositories
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<ITransactionRepository, TransactionRepository>();

            // Authentication Services
            services.AddScoped<IJwtService, JwtService>();

            return services;
        }
    }
}
