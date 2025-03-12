using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using System.Text;
using fopfin.API.Configurations; // Ensure correct namespace for DependencyInjection

namespace fopfin.API
{
    public class Startup
    {
        public IConfiguration Configuration { get; }

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration ?? throw new ArgumentNullException(nameof(configuration));
        }

        public void ConfigureServices(IServiceCollection services)
        {
            // Ensure extension methods exist in DependencyInjection.cs
            services.AddApplicationServices(); 
            services.AddInfrastructureServices(Configuration);

            services.AddControllers();

            // Swagger Configuration
            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "Fopfin API", Version = "v1" });
            });

            // Read JWT settings safely
            var jwtSecret = Configuration["Jwt:Secret"] ?? throw new ArgumentNullException("Jwt:Secret is missing");
            var jwtIssuer = Configuration["Jwt:Issuer"] ?? throw new ArgumentNullException("Jwt:Issuer is missing");
            var jwtAudience = Configuration["Jwt:Audience"] ?? throw new ArgumentNullException("Jwt:Audience is missing");

            // OAuth & JWT Authentication
            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddGoogle(options =>
            {
                options.ClientId = Configuration["GoogleOAuth:ClientId"] ?? throw new ArgumentNullException("GoogleOAuth:ClientId is missing");
                options.ClientSecret = Configuration["GoogleOAuth:ClientSecret"] ?? throw new ArgumentNullException("GoogleOAuth:ClientSecret is missing");
            })
            .AddJwtBearer(options =>
            {
                var key = Encoding.UTF8.GetBytes(jwtSecret);
                options.RequireHttpsMetadata = false;
                options.SaveToken = true;
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = true,
                    ValidIssuer = jwtIssuer,
                    ValidateAudience = true,
                    ValidAudience = jwtAudience,
                    ValidateLifetime = true
                };
            });

            services.AddAuthorization();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Fopfin API v1"));
            }

            app.UseHttpsRedirection();
            app.UseRouting();
            app.UseAuthentication();
            app.UseAuthorization();
            
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
