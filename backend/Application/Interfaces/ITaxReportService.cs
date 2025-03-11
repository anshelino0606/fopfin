using fopfin.API.DTOs;

namespace fopfin.Application.Interfaces {
    public interface ITaxReportService
    {
        Task<TaxReportDto> GenerateReport(int userId, string period);
    }
}
