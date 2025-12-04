using System.Threading.Tasks;
using fopfin.API.DTOs;

namespace fopfin.Application.Interfaces 
{
    public interface IReportGenerator 
    {
        Task<byte[]> GenerateAsync(TaxReportDto data);
    }
}