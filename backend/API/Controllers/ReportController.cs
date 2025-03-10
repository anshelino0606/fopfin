using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Threading.Tasks;
using fopfin.Application.Interfaces;

namespace fopfin.API.Controllers
{
    [Route("api/report")]
    [ApiController]
    public class ReportController : ControllerBase
    {
        private readonly ITaxReportService _taxReportService;
        private readonly IPdfGeneratorService _pdfGeneratorService;

        public ReportController(ITaxReportService taxReportService, IPdfGeneratorService pdfGeneratorService)
        {
            _taxReportService = taxReportService;
            _pdfGeneratorService = pdfGeneratorService;
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


        [HttpGet("pdf")]
        public async Task<IActionResult> GeneratePdfReport([FromQuery] int userId, [FromQuery] string month)
        {
            var report = await _taxReportService.GenerateReport(userId, month);
            var pdfBytes = await _pdfGeneratorService.GeneratePdf(report);
            return File(pdfBytes, "application/pdf", "tax-report.pdf");
        }

        [HttpGet("tax")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetTaxReport([FromQuery] int userId, [FromQuery] string period)
        {
            var report = await _taxReportService.GenerateReport(userId, period);
            var pdf = await _pdfGeneratorService.GeneratePdf(report);
            return File(pdf, "application/pdf", "TaxReport.pdf");
        }
    }
}