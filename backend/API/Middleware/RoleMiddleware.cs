using Microsoft.AspNetCore.Http;
using System.Security.Claims;
using System.Threading.Tasks;

public class RoleMiddleware
{
    private readonly RequestDelegate _next;

    public RoleMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task Invoke(HttpContext context)
    {
        // ✅ Use a safe null check: Default to an empty string if no role is found
        var userRole = context.User.FindFirst(ClaimTypes.Role)?.Value ?? string.Empty;
        var path = context.Request.Path.Value ?? string.Empty; // ✅ Ensure path is not null

        // Enforce restrictions
        if ((path.StartsWith("/api/admin") && userRole != "Admin") ||
            (path.StartsWith("/api/reports/tax") && userRole == "Observer")) // Observers cannot access tax reports
        {
            context.Response.StatusCode = 403;
            await context.Response.WriteAsync("Forbidden");
            return;
        }

        await _next(context);
    }
}