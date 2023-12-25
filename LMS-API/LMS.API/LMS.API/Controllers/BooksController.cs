using LMS.API.Data;
using LMS.API.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace LMS.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : Controller
    {
        private readonly LMSDbContext _lmsDbContext;
        public BooksController(LMSDbContext lmsDbContext)
        {
            _lmsDbContext = lmsDbContext;
        }

        [HttpGet]
        public IActionResult GetAllBooks()
        {
            var books = _lmsDbContext.Books
                              .Join(
                                    _lmsDbContext.BookCategories,
                                    book => book.CategoryId,
                                    category => category.Id,
                                    (book, category) => new
                                    {
                                        Id = book.Id,
                                        Title = book.Title,
                                        Author = book.Author,
                                        Description = book.Description,
                                        CoverImageUrl = book.CoverImageUrl,
                                        Category = category.Category
                                    })
                                    .OrderByDescending(book => book.Id)
                                    .ToList();
            return Ok(books);
        }

        [HttpGet]
        [Route("{createdBy:int}")]
        public IActionResult GetBooksByUser([FromRoute] int createdBy)
        {
            var books = _lmsDbContext.Books
                              .Join(
                                    _lmsDbContext.BookCategories,
                                    book => book.CategoryId,
                                    category => category.Id,
                                    (book, category) => new
                                    {
                                        Id = book.Id,
                                        Title = book.Title,
                                        Author = book.Author,
                                        Description = book.Description,
                                        CoverImageUrl = book.CoverImageUrl,
                                        Category = category.Category,
                                        CreatedBy = book.CreatedBy
                                    }
                                    ).Where(book => book.CreatedBy == createdBy).ToList();

            return Ok(books);
        }

        [HttpGet]
        [Route("Latest")]
        public IActionResult GetLatestBooks()
        {
            var top5Books = _lmsDbContext.Books
                            .OrderByDescending(book => book.Id)
                            .Take(5)
                            .ToList();

            return Ok(top5Books);
        }

        [HttpGet]
        [Route("GroupByCategories")]
        public IActionResult BooksByCategory()
        {
            var result = (
                        from category in _lmsDbContext.BookCategories
                        join book in _lmsDbContext.Books on category.Id equals book.CategoryId into bookGroup
                        from book in bookGroup.DefaultIfEmpty()
                        group new { category, book } by category.Category into grouped
                        select new
                        {
                            Category = grouped.Key,
                            Total = grouped.Count(x => x.book != null)
                        }
                    ).ToList();



            return Ok(result);
        }

        [HttpPost]
        public IActionResult CreateBook([FromBody] CreateBook bookRequest)
        {
            var book = _lmsDbContext.Books.FirstOrDefault(x=> x.Title == bookRequest.Title);

            if(book != null)
            {
                return Ok("Book Already Exists");
            }

            //if a new category is introduced
            var newCategory = _lmsDbContext.BookCategories.FirstOrDefault(x=> x.Category.ToLower() == bookRequest.Category.ToLower());
            if(newCategory == null)
            {
                var newCategoryValue = new BookCategory
                {
                    Category = bookRequest.Category
                };
                _lmsDbContext.BookCategories.Add(newCategoryValue);
                _lmsDbContext.SaveChanges();
            }

            var categoryId = _lmsDbContext.BookCategories
            .Where(x => x.Category.ToLower() == bookRequest.Category.ToLower())
            .Select(x => x.Id)
            .FirstOrDefault();

            var newBook = new Book
            {
                Title = bookRequest.Title,
                Author = bookRequest.Author,
                Description = bookRequest.Description,
                CoverImageUrl = bookRequest.CoverImageUrl,
                CategoryId = categoryId,
                CreatedBy = bookRequest.CreatedBy
            };

            _lmsDbContext.Books.Add(newBook);
            _lmsDbContext.SaveChanges();

            return Ok("Book Created Successfully");

        }

        [HttpDelete]
        [Route("{id:int}")]
        public IActionResult DeleteBook([FromRoute] int id)
        {
            var bookToRemove = _lmsDbContext.Books.FirstOrDefault(x=> x.Id == id);
            _lmsDbContext.Books.Remove(bookToRemove);
            _lmsDbContext.SaveChanges();
            return Ok("Book deleted successfully");
        }
    }
}


