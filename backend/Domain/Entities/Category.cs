using fopfin.Domain.Enums;

namespace fopfin.Domain.Entities
{
    public class Category
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public TransactionType Type { get; set; } // Expense or Income
        public string Icon { get; set; } = string.Empty;
        public int UserId { get; set; }
        public User User { get; set; } = null!;
    }
}
