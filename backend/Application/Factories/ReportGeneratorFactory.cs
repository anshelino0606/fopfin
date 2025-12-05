using System;
using fopfin.Application.Enums;
using fopfin.Application.Interfaces;
using fopfin.Application.Services;

namespace fopfin.Application.Factories
{
    public class ReportGeneratorFactory
    {
        public static IReportGenerator Create(ReportFormat format)
        {
            return format switch
            {
                ReportFormat.Pdf => new PdfReportGenerator(),
                ReportFormat.Csv => new CsvReportGenerator(),
                _ => throw new ArgumentException($"Unsupported report format: {format}")
            };
        }
    }
}