using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace LMS.API.Models
{
    public class Book
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Title { get; set; }
        public string Author { get; set; }
        public string Description { get; set; }
        public string CoverImageUrl { get; set; }
        public int CategoryId { get; set; } //navigation property
        [ForeignKey("CategoryId")]
        public BookCategory CategoryOfBook { get; set; }

        // Foreign key to User table for createdBy
        public int CreatedBy { get; set; }

        [ForeignKey("CreatedBy")]
        public User CreatedByUser { get; set; }  // Navigation property


    }
}
