using System;

namespace fopfin.Domain.ValueObjects
{
    public class TaxRate
    {
        public decimal Rate { get; }

        public TaxRate(decimal rate)
        {
            if (rate < 0 || rate > 100)
                throw new ArgumentException("Tax rate must be between 0% and 100%.");
            Rate = rate;
        }

        public decimal ApplyTo(decimal amount) => amount * (Rate / 100);

        public override string ToString() => $"{Rate}%";

        public override bool Equals(object? obj)
        {
            if (obj is not TaxRate taxRate)
                return false;
            return Rate == taxRate.Rate;
        }

        public override int GetHashCode() => Rate.GetHashCode();
    }
}
