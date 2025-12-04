using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Threading.Tasks;
using fopfin.Application.Interfaces;
using fopfin.Application.Factories;
using fopfin.Application.Enums;
using System.Security.Claims;

namespace fopfin.API.Controllers
{
    [Route("api/report")]
    [ApiController]
    public class ReportController : ControllerBase
    {
        private readonly ITaxReportService _taxReportService;

        public ReportController(ITaxReportService taxReportService)
        {
            _taxReportService = taxReportService;
        }

        [HttpGet("monthly")]
        [Authorize] // ✅ Ensures only authenticated users can request reports
        public async Task<IActionResult> GetMonthlyReport([FromQuery] int userId, [FromQuery] string month)
        {
            var currentUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");

            if (currentUserId != userId && !User.IsInRole("Admin"))
                return Forbid(); // ✅ Prevent unauthorized access

            var report = await _taxReportService.GenerateReport(userId, month);
            return Ok(report);
        }


        [HttpGet("generate")]
        public async Task<IActionResult> GenerateReport([FromQuery] int userId, [FromQuery] string month, [FromQuery] ReportFormat format = ReportFormat.Pdf)
        {
            var report = await _taxReportService.GenerateReport(userId, month);
            var generator = ReportGeneratorFactory.Create(format);
            var reportBytes = await generator.GenerateAsync(report);
            
            return format switch
            {
                ReportFormat.Pdf => File(reportBytes, "application/pdf", "tax-report.pdf"),
                ReportFormat.Csv => File(reportBytes, "text/csv", "tax-report.csv"),
                _ => BadRequest("Unsupported format")
            };
        }

        [HttpGet("tax")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetTaxReport([FromQuery] int userId, [FromQuery] string period, [FromQuery] ReportFormat format = ReportFormat.Pdf)
        {
            var report = await _taxReportService.GenerateReport(userId, period);
            var generator = ReportGeneratorFactory.Create(format);
            var reportBytes = await generator.GenerateAsync(report);
            
            return format switch
            {
                ReportFormat.Pdf => File(reportBytes, "application/pdf", "TaxReport.pdf"),
                ReportFormat.Csv => File(reportBytes, "text/csv", "TaxReport.csv"),
                _ => BadRequest("Unsupported format")
            };
        }
    }
}