using fopfin.Domain.Enums;

namespace fopfin.Application.Strategies
{
    public interface ITaxStrategyFactory
    {
        ITaxCalculationStrategy GetStrategy(TaxGroup taxGroup);
    }

    public class TaxStrategyFactory : ITaxStrategyFactory
    {
        // Використовуємо IServiceProvider для отримання інстансів стратегій, 
        // щоб зберегти переваги DI (наприклад, якщо стратегіям знадобляться інші сервіси в майбутньому)
        private readonly IServiceProvider _serviceProvider;

        public TaxStrategyFactory(IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
        }

        public ITaxCalculationStrategy GetStrategy(TaxGroup taxGroup)
        {
            return taxGroup switch
            {
                TaxGroup.Entrepreneur => _serviceProvider.GetRequiredService<EntrepreneurTaxStrategy>(),
                TaxGroup.Business => _serviceProvider.GetRequiredService<GeneralSystemTaxStrategy>(),
                TaxGroup.Individual => _serviceProvider.GetRequiredService<IndividualTaxStrategy>(),
                _ => throw new ArgumentException($"No tax strategy defined for tax group: {taxGroup}")
            };
        }
    }
}