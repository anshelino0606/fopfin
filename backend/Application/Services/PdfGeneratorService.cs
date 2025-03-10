using SelectPdf;
using System.IO;
using System.Threading.Tasks;
using fopfin.Application.Interfaces;
using fopfin.API.DTOs;

namespace fopfin.Application.Services
{
    public class PdfGeneratorService : IPdfGeneratorService
    {
        public async Task<byte[]> GeneratePdf(TaxReportDto taxReport)
        {
            string htmlContent = $"<h1>Tax Report for {taxReport.Period}</h1>" +
                                $"<p><strong>Total Income:</strong> {taxReport.TotalIncome}</p>" +
                                $"<p><strong>Total Tax:</strong> {taxReport.TotalTax}</p>";

            // Add transactions
            htmlContent += "<h2>Transactions</h2><ul>";
            foreach (var transaction in taxReport.Transactions)
            {
                htmlContent += $"<li>{transaction.Date}: {transaction.Amount} ({transaction.Type})</li>";
            }
            htmlContent += "</ul>";

            HtmlToPdf converter = new HtmlToPdf();
            PdfDocument doc = converter.ConvertHtmlString(htmlContent);

            using (MemoryStream ms = new MemoryStream())
            {
                doc.Save(ms);
                return ms.ToArray();
            }
        }

    }
}
