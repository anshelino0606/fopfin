using System.Collections.Generic;
using System.Threading.Tasks;
using fopfin.Domain.Entities;

namespace fopfin.Application.Interfaces
{
    public interface ITransactionRepository
    {
        Task<IEnumerable<Transaction>> GetTransactions(int userId, string period);
    }
}
