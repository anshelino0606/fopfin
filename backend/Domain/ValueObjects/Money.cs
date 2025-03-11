using System;
using System.Globalization;

namespace fopfin.Domain.ValueObjects
{
    public class Money
    {
        public decimal Amount { get; }

        public Money(decimal amount)
        {
            if (amount < 0)
                throw new ArgumentException("Amount cannot be negative.");
            Amount = amount;
        }

        public Money ApplyTax(TaxRate taxRate) =>
            new Money(Amount - taxRate.ApplyTo(Amount));

        public override string ToString() =>
            Amount.ToString("C", CultureInfo.InvariantCulture);

        public override bool Equals(object? obj)
        {
            if (obj is not Money money)
                return false;
            return Amount == money.Amount;
        }

        public override int GetHashCode() => Amount.GetHashCode();
    }
}
