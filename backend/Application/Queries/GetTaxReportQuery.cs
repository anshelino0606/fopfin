public class GetTaxReportQuery
{
    public int UserId { get; set; }
    public string Period { get; set; }

    public GetTaxReportQuery(int userId, string period)
    {
        UserId = userId;
        Period = period;
    }
}
