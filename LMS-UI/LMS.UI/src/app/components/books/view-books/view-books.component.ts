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

    //Api Call to Get All Books
    this.bookService.getAllBooks()
    .subscribe({
      next: (res) => {
        this.books = res;
        this.filteredBooks = [...this.books];
      }
    });    
  }

  //Modal for Details of Books
  openDetailsModal(book: any): void {
    const modalRef = this.modalService.open(BookDetailsModalComponent, {
      centered: true, 
      size: 'lg',
    });
    modalRef.componentInstance.book = book;
  }

  // Function to filter books based on search term
  filterBooks(): void {
    this.filteredBooks = this.books.filter((book) =>
      this.searchMatches(book, this.searchTerm)
    );
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
