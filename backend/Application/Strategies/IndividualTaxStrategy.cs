using fopfin.Domain.Entities;
using fopfin.Domain.Enums;

namespace fopfin.Application.Strategies
{
    public class IndividualTaxStrategy : ITaxCalculationStrategy
    {
        // Приклад: 19.5% від доходу (стандартна ставка для фізосіб в Україні на даний момент)
        private const decimal TaxRate = 0.195m; 

        public decimal CalculateTax(IEnumerable<Transaction> transactions)
        {
            var totalIncome = transactions
                .Where(t => t.Type == TransactionType.Income)
                .Sum(t => t.Amount);

            return totalIncome * TaxRate;
        }
    }
}