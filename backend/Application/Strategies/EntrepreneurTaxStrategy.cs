using fopfin.Domain.Entities;
using fopfin.Domain.Enums;

namespace fopfin.Application.Strategies
{
    public class EntrepreneurTaxStrategy : ITaxCalculationStrategy
    {
        private const decimal TaxRate = 0.05m;

        public decimal CalculateTax(IEnumerable<Transaction> transactions)
        {
            var totalIncome = transactions
                .Where(t => t.Type == TransactionType.Income)
                .Sum(t => t.Amount);

            return totalIncome * TaxRate;
        }
    }
}