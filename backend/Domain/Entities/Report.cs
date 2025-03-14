namespace fopfin.Domain.Entities
{
    public class Report
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public User User { get; set; } = null!;
        public DateTime Month { get; set; }
        public decimal TotalIncome { get; set; }
        public decimal TotalExpense { get; set; }
        public DateTime GeneratedAt { get; set; }
        public string? PdfUrl { get; set; }
    }
}
