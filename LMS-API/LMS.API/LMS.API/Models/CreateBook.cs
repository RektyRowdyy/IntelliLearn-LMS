namespace LMS.API.Models
{
    public class CreateBook
    {
        public string Title { get; set; }
        public string Author { get; set; }
        public string Category { get; set; }
        public string Description { get; set; }
        public string CoverImageUrl { get; set; }
        public int CreatedBy { get; set; }
    }
}
