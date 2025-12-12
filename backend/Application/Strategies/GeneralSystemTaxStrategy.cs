using fopfin.Domain.Entities;
using fopfin.Domain.Enums;

namespace fopfin.Application.Strategies
{
    public class GeneralSystemTaxStrategy : ITaxCalculationStrategy
    {
        private const decimal TaxRate = 0.18m;

        public decimal CalculateTax(IEnumerable<Transaction> transactions)
        {
            var income = transactions
                .Where(t => t.Type == TransactionType.Income)
                .Sum(t => t.Amount);

            var expenses = transactions
                .Where(t => t.Type == TransactionType.Expense)
                .Sum(t => t.Amount);

            var profit = income - expenses;

            // Податок не може бути від'ємним, якщо є збиток
            return profit > 0 ? profit * TaxRate : 0;
        }
    }
}