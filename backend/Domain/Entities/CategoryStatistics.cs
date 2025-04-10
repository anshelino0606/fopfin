public class CategoryStatistics
{
    public int Id { get; set; }
    
    public int ReportId { get; set; }
    public Report Report { get; set; }
    
    public int? CategoryId { get; set; }
    public Category Category { get; set; }
    
    public decimal Total { get; set; }
    
    public string Type { get; set; } // Expense or Income
}
