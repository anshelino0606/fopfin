using System.Linq;
using System.Threading.Tasks;
using fopfin.Application.Interfaces;
using fopfin.API.DTOs;
using fopfin.Infrastructure.Persistence;

public class TaxReportService : ITaxReportService
{
    private readonly ITransactionRepository _transactionRepo;

    public TaxReportService(ITransactionRepository transactionRepo)
    {
        _transactionRepo = transactionRepo;
    }

    public async Task<TaxReportDto> GenerateReport(int userId, string period)
        {
            var transactions = await _transactionRepo.GetTransactions(userId, period);

            decimal totalIncome = transactions.Where(t => t.Type == TransactionType.Income).Sum(t => t.Amount);
            decimal totalTax = totalIncome * 0.05m; // Example: 5% tax

            return new TaxReportDto
            {
                UserId = userId,
                Period = period,
                TotalIncome = totalIncome,
                TotalTax = totalTax
            };
        }
}
