using System;

namespace fopfin.API.DTOs
{
    public class TaxReportDto
    {
        public int UserId { get; set; }
        public string Period { get; set; }
        public decimal TotalIncome { get; set; }
        public decimal TotalTax { get; set; }
    }
}