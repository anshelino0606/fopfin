using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using fopfin.Application.Interfaces;
using fopfin.Domain.Entities;

namespace fopfin.Infrastructure.Persistence {
    public class TransactionRepository : ITransactionRepository
    {
        private readonly AppDbContext _context;

        public TransactionRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Transaction>> GetTransactions(int userId, string period)
        {
            return await _context.Transactions
                .Where(t => t.UserId == userId && t.CreatedAt.ToString("yyyy-MM") == period)
                .ToListAsync();
        }
    }
}