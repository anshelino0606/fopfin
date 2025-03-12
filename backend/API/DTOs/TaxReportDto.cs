using System;
using System.Collections.Generic;

namespace fopfin.API.DTOs
{
    public class TaxReportDto
    {
        public int UserId { get; set; }
        public string Period { get; set; } = string.Empty; // ✅ Initialize default value
        public decimal TotalIncome { get; set; }
        public decimal TotalTax { get; set; }
        public List<TransactionDto> Transactions { get; set; } = new List<TransactionDto>(); // ✅ Ensure list is initialized
    }

    public class TransactionDto
    {
        public DateTime Date { get; set; }
        public decimal Amount { get; set; }
        public string Type { get; set; } = string.Empty; // ✅ Initialize default value
    }
}