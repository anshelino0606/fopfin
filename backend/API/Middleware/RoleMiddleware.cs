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
        var userRole = context.User.FindFirst(ClaimTypes.Role)?.Value;
        var path = context.Request.Path.Value;

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
