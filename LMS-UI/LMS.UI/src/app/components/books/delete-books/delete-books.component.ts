import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Book } from 'src/app/models/books-model';
import { BooksService } from 'src/app/services/books.service';
import { UsersService } from 'src/app/services/users.service';
import { DeleteConfirmationModalComponent } from './delete-confirmation-modal/delete-confirmation-modal.component';

@Component({
  selector: 'app-delete-books',
  templateUrl: './delete-books.component.html',
  styleUrls: ['./delete-books.component.css']
})
export class DeleteBooksComponent implements OnInit {

  books: Book[] = [];
  filteredBooks: Book[] = [];
  searchTerm: string = '';
  constructor(private modalService: NgbModal, private bookService: BooksService, private userService: UsersService) { }

  ngOnInit(): void {
    this.bookService.getBooksByUser(this.userService.getTokenUserInfo()?.Id)
    .subscribe({
      next: (res) => {
        this.books = res;  
        this.filteredBooks = [...this.books];
      }
    });
  }

  //Delete Confirmation Modal
  openConfirmationModal(book: Book): void {
    const modalRef = this.modalService.open(DeleteConfirmationModalComponent);
    modalRef.componentInstance.bookTitle = book.title;
    
    //Getting back Confirmation from the Modal
    modalRef.componentInstance.confirmDelete.subscribe((confirmation: boolean) => {
      if (confirmation) {
        this.deleteBook(book.id);
        this.books = this.books.filter((b) => b.id !== book.id);
        this.filterBooks();
      }
    });
  }

  //OnSubmit
  deleteBook(id: number): void {
    this.bookService.deleteBook(id)
    .subscribe({
      next: (res) => {
        alert(res);
      }
    });
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
