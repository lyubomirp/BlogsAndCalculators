namespace IssueTracker.Models
{
    using Microsoft.EntityFrameworkCore;

    public class IssueDbContext : DbContext
    {
        internal Issue first;

        public DbSet<Issue> Issues { get; set; }

        public IssueDbContext()
        {
            this.Database.EnsureCreated();
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseMySQL("server=localhost;database=issuetracker_asp;user=root;");
        }
    }
}
