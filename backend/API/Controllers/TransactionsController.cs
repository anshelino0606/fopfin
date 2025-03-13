using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using fopfin.Domain.Entities;
using fopfin.Domain.Enums;
using fopfin.Infrastructure.Persistence;

namespace backend.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TransactionsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TransactionsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Transactions
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Transaction>>> GetTransaction()
        {
          if (_context.Transactions == null)
          {
              return NotFound();
          }
            return await _context.Transactions.ToListAsync();
        }

        // GET: api/Transactions/id/5
        [HttpGet("id/{id}")]
        public async Task<ActionResult<Transaction>> GetTransaction(int id)
        {
          if (_context.Transactions == null)
          {
              return NotFound();
          }
            var transaction = await _context.Transactions.FindAsync(id);

            if (transaction == null)
            {
                return NotFound();
            }

            return transaction;
        }

        // GET: api/Transactions/userId/1
        [HttpGet("userId/{userId}")]
        public async Task<ActionResult<IEnumerable<Transaction>>> GetTransactionByUser(int userId)
        {
            if (_context.Transactions == null) return NotFound();
            var transactions = _context.Transactions.AsQueryable().Where(x => x.UserId == userId);
            if (transactions == null) return NotFound();
            return await transactions.ToListAsync();
        }

        // GET: api/Transactions/userId/1/transaction_type/0
        [HttpGet("userId/{userId}/transaction_type/{type}")]
        public async Task<ActionResult<IEnumerable<Transaction>>> GetTransactionByUserAndType(int userId, TransactionType type)
        {
            if (_context.Transactions == null) return NotFound();
            var transactions = _context.Transactions.AsQueryable().Where(x => x.UserId == userId && x.Type == type);
            if (transactions == null) return NotFound();
            return await transactions.ToListAsync();
        }

        // GET: api/Transactions/userId/1/created_at/2025-03-13T15:14:01.427Z
        [HttpGet("userId/{userId}/created_at/{dt}")]
        public async Task<ActionResult<IEnumerable<Transaction>>> GetTransactionByCreatedAt(int userId, DateTime dt)
        {
            if (_context.Transactions == null) return NotFound();
            var transactions = _context.Transactions.AsQueryable().Where(x => x.UserId == userId && x.CreatedAt == dt);
            if (transactions == null) return NotFound();
            return await transactions.ToListAsync();
        }

        // PUT: api/Transactions/id/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("id/{id}")]
        public async Task<IActionResult> PutTransaction(int id, Transaction transaction)
        {
            if (id != transaction.Id)
            {
                return BadRequest();
            }

            _context.Entry(transaction).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TransactionExists(id))
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

        // POST: api/Transactions
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Transaction>> PostTransaction(Transaction transaction)
        {
          if (_context.Transactions == null)
          {
              return Problem("Entity set 'AppDbContext.Transaction'  is null.");
          }
            _context.Transactions.Add(transaction);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTransaction", new { id = transaction.Id }, transaction);
        }

        // DELETE: api/Transactions/id/5
        [HttpDelete("id/{id}")]
        public async Task<IActionResult> DeleteTransaction(int id)
        {
            if (_context.Transactions == null)
            {
                return NotFound();
            }
            var transaction = await _context.Transactions.FindAsync(id);
            if (transaction == null)
            {
                return NotFound();
            }

            _context.Transactions.Remove(transaction);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TransactionExists(int id)
        {
            return (_context.Transactions?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
