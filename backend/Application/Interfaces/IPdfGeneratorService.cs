using System.Threading.Tasks;
using fopfin.API.DTOs;

namespace fopfin.Application.Interfaces
{
    public interface IPdfGeneratorService
    {
        Task<byte[]> GeneratePdf(TaxReportDto taxReport);
    }
}