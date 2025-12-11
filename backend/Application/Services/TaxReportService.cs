using fopfin.Application.Interfaces;
using fopfin.Application.Strategies;
using fopfin.API.DTOs;
using fopfin.Domain.Enums;

namespace fopfin.Application.Services
{
    public class TaxReportService : ITaxReportService
    {
        private readonly ITransactionRepository _transactionRepo;
        private readonly IUserRepository _userRepository;
        private readonly ITaxStrategyFactory _taxStrategyFactory;

        public TaxReportService(
            ITransactionRepository transactionRepo, 
            IUserRepository userRepository,
            ITaxStrategyFactory taxStrategyFactory)
        {
            _transactionRepo = transactionRepo;
            _userRepository = userRepository;
            _taxStrategyFactory = taxStrategyFactory;
        }

        public async Task<TaxReportDto> GenerateReport(int userId, string period)
        {
            // 1. Отримуємо користувача для визначення TaxGroup
            var user = await _userRepository.GetByIdAsync(userId);
            if (user == null)
            {
                throw new KeyNotFoundException($"User with ID {userId} not found.");
            }

            // 2. Отримуємо транзакції
            var transactions = await _transactionRepo.GetTransactions(userId, period);

            // 3. Обираємо стратегію через фабрику
            var strategy = _taxStrategyFactory.GetStrategy(user.TaxGroup);

            // 4. Розраховуємо податок
            decimal taxAmount = strategy.CalculateTax(transactions);

            // 5. Формуємо результат (DTO)
            var totalIncome = transactions
                .Where(t => t.Type == TransactionType.Income)
                .Sum(t => t.Amount);

            return new TaxReportDto
            {
                UserId = userId,
                Period = period,
                TotalIncome = totalIncome,
                TotalTax = taxAmount,
                // Мапінг транзакцій в DTO (спрощено)
                Transactions = transactions.Select(t => new TransactionDto 
                { 
                    Date = t.CreatedAt, 
                    Amount = t.Amount, 
                    Type = t.Type.ToString() 
                }).ToList()
            };
        }
    }
}