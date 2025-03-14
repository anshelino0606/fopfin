using fopfin.Domain.Enums;

namespace fopfin.Domain.Entities
{
    public class TaxReport
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public User User { get; set; } = null!;
        public DateTime PeriodStart { get; set; }
        public DateTime PeriodEnd { get; set; }
        public decimal TotalIncome { get; set; }
        public decimal TaxableIncome { get; set; }
        public decimal TaxDue { get; set; }
        public PeriodType PeriodType { get; set; } 
        public DateTime GeneratedAt { get; set; }
        public string? PdfUrl { get; set; }
    }
}
