public class CreateTaxReportCommand
{
    public int UserId { get; set; }
    public string Period { get; set; }

    public CreateTaxReportCommand(int userId, string period)
    {
        UserId = userId;
        Period = period;
    }
}
