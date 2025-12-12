using fopfin.Domain.Entities;

namespace fopfin.Application.Strategies
{
    public interface ITaxCalculationStrategy
    {
        decimal CalculateTax(IEnumerable<Transaction> transactions);
    }
}