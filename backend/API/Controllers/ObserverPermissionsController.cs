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
    public class ObserverPermissionsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ObserverPermissionsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/ObserverPermissions
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ObserverPermission>>> GetObserverPermissions()
        {
          if (_context.ObserverPermissions == null)
          {
              return NotFound();
          }
            return await _context.ObserverPermissions.ToListAsync();
        }

        // GET: api/ObserverPermissions/5
        [HttpGet("id/{id}")]
        public async Task<ActionResult<ObserverPermission>> GetObserverPermission(int id)
        {
          if (_context.ObserverPermissions == null)
          {
              return NotFound();
          }
            var observerPermission = await _context.ObserverPermissions.FindAsync(id);

            if (observerPermission == null)
            {
                return NotFound();
            }

            return observerPermission;
        }

        // PUT: api/ObserverPermissions/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("id/{id}")]
        public async Task<IActionResult> PutObserverPermission(int id, ObserverPermission observerPermission)
        {
            if (id != observerPermission.Id)
            {
                return BadRequest();
            }

            _context.Entry(observerPermission).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ObserverPermissionExists(id))
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

        // POST: api/ObserverPermissions
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ObserverPermission>> PostObserverPermission(ObserverPermission observerPermission)
        {
          if (_context.ObserverPermissions == null)
          {
              return Problem("Entity set 'AppDbContext.ObserverPermissions'  is null.");
          }
            _context.ObserverPermissions.Add(observerPermission);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetObserverPermission", new { id = observerPermission.Id }, observerPermission);
        }

        // DELETE: api/ObserverPermissions/5
        [HttpDelete("id/{id}")]
        public async Task<IActionResult> DeleteObserverPermission(int id)
        {
            if (_context.ObserverPermissions == null)
            {
                return NotFound();
            }
            var observerPermission = await _context.ObserverPermissions.FindAsync(id);
            if (observerPermission == null)
            {
                return NotFound();
            }

            _context.ObserverPermissions.Remove(observerPermission);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ObserverPermissionExists(int id)
        {
            return (_context.ObserverPermissions?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
