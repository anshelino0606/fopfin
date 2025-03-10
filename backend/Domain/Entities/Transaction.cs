using fopfin.Domain.Enums;

namespace fopfin.Domain.Entities {
    public class Transaction
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public decimal Amount { get; set; }
        public TransactionType Type { get; set; }
        public decimal TaxAmount { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
