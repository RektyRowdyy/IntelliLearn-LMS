using LMS.API.Models;
using Microsoft.EntityFrameworkCore;

namespace LMS.API.Data
{
    public class LMSDbContext : DbContext
    {
        public LMSDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Book> Books { get; set; }
        public DbSet<BookCategory> BookCategories { get; set; }

    }
}
