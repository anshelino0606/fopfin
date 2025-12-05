using System.Text;
using System.Threading.Tasks;
using fopfin.Application.Interfaces;
using fopfin.API.DTOs;

namespace fopfin.Application.Services
{
    public class CsvReportGenerator : IReportGenerator
    {
        public async Task<byte[]> GenerateAsync(TaxReportDto taxReport)
        {
            return await Task.Run(() =>
            {
                var csv = new StringBuilder();
                
                // Header
                csv.AppendLine($"Tax Report for {taxReport.Period}");
                csv.AppendLine($"Total Income,{taxReport.TotalIncome}");
                csv.AppendLine($"Total Tax,{taxReport.TotalTax}");
                csv.AppendLine();
                
                // Transactions header
                csv.AppendLine("Date,Amount,Type");
                
                // Transactions data
                foreach (var transaction in taxReport.Transactions)
                {
                    csv.AppendLine($"{transaction.Date:yyyy-MM-dd},{transaction.Amount},{transaction.Type}");
                }
                
                return Encoding.UTF8.GetBytes(csv.ToString());
            });
        }
    }
}