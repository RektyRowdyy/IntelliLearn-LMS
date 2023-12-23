import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BookDetailsModalComponent } from './book-details-modal/book-details-modal.component';
import { Book } from 'src/app/models/books-model';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-view-books',
  templateUrl: './view-books.component.html',
  styleUrls: ['./view-books.component.css']
})
export class ViewBooksComponent implements OnInit {

  books: Book[] = [];
  filteredBooks: Book[] = [];
  searchTerm: string = '';
  constructor(private modalService: NgbModal, private bookService: BooksService) { }

  ngOnInit(): void {
    this.bookService.getAllBooks()
    .subscribe({
      next: (res) => {
        this.books = res;
        console.log(this.books);
        
        this.filteredBooks = [...this.books];
      }
    });    
  }

  openDetailsModal(book: any): void {
    const modalRef = this.modalService.open(BookDetailsModalComponent, {
      centered: true, // Center the modal
      size: 'lg', // You can adjust the size as needed
    });
    modalRef.componentInstance.book = book;
  }

  // Function to filter books based on search term
  filterBooks(): void {
    this.filteredBooks = this.books.filter((book) =>
      this.searchMatches(book, this.searchTerm)
    );
    console.log(this.filteredBooks);
    
  }

  // Helper function to check if a book matches the search term
  private searchMatches(book: Book, term: string): boolean {
    return (
      book.title.toLowerCase().includes(term.toLowerCase()) ||
      book.author.toLowerCase().includes(term.toLowerCase()) ||
      book.category.toLowerCase().includes(term.toLowerCase())
    );
  }

}
