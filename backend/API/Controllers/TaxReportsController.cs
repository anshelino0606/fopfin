using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using fopfin.Domain.Entities;
using fopfin.Infrastructure.Persistence;

namespace backend.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaxReportsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TaxReportsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/TaxReports
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TaxReport>>> GetTaxReports()
        {
          if (_context.TaxReports == null)
          {
              return NotFound();
          }
            return await _context.TaxReports.ToListAsync();
        }

        // GET: api/TaxReports/5
        [HttpGet("id/{id}")]
        public async Task<ActionResult<TaxReport>> GetTaxReport(int id)
        {
          if (_context.TaxReports == null)
          {
              return NotFound();
          }
            var taxReport = await _context.TaxReports.FindAsync(id);

            if (taxReport == null)
            {
                return NotFound();
            }

            return taxReport;
        }

        // PUT: api/TaxReports/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("id/{id}")]
        public async Task<IActionResult> PutTaxReport(int id, TaxReport taxReport)
        {
            if (id != taxReport.Id)
            {
                return BadRequest();
            }

            _context.Entry(taxReport).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TaxReportExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/TaxReports
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<TaxReport>> PostTaxReport(TaxReport taxReport)
        {
          if (_context.TaxReports == null)
          {
              return Problem("Entity set 'AppDbContext.TaxReports'  is null.");
          }
            _context.TaxReports.Add(taxReport);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTaxReport", new { id = taxReport.Id }, taxReport);
        }

        // DELETE: api/TaxReports/5
        [HttpDelete("id/{id}")]
        public async Task<IActionResult> DeleteTaxReport(int id)
        {
            if (_context.TaxReports == null)
            {
                return NotFound();
            }
            var taxReport = await _context.TaxReports.FindAsync(id);
            if (taxReport == null)
            {
                return NotFound();
            }

            _context.TaxReports.Remove(taxReport);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TaxReportExists(int id)
        {
            return (_context.TaxReports?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
