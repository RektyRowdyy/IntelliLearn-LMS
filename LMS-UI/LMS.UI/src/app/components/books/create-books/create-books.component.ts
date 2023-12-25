import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { BooksService } from 'src/app/services/books.service';
import { UsersService } from 'src/app/services/users.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ViewImageModalComponent } from './view-image-modal/view-image-modal.component';

@Component({
  selector: 'app-create-books',
  templateUrl: './create-books.component.html',
  styleUrls: ['./create-books.component.css']
})
export class CreateBooksComponent implements OnInit {

  bookForm!: FormGroup;
  responseMsg: string = "";

  constructor(private fb: FormBuilder, private userService: UsersService, private bookService: BooksService, private router: Router, private modalService: NgbModal) { }

  ngOnInit(): void {

    //Form Validation
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      category: ['', Validators.required],
      description: ['', Validators.required],
      coverImageUrl: ['', [Validators.required,imageUrlValidator()]]
    })
  }

  //Validation Check for Fields
  isInvalid(controlName: string): boolean {
    const control = this.bookForm.get(controlName);
    return !!control && control.invalid && (control.dirty || control.touched);
  }

  //onSubmit
  createBook() {

    let bookInfo = {
      title: this.bookForm.get('title')?.value,
      author: this.bookForm.get('author')?.value,
      category: this.bookForm.get('category')?.value,
      description: this.bookForm.get('description')?.value,
      coverImageUrl: this.bookForm.get('coverImageUrl')?.value,
      createdBy: this.userService.getTokenUserInfo()?.Id
    }

    this.bookService.createBook(bookInfo)
    .subscribe({
      next: (res) => {
        this.responseMsg = res.toString();
        alert(this.responseMsg);
        if(this.responseMsg == "Book Created Successfully")
          this.router.navigate(['/view-book']);
      }
    });
  }

  //Modal to Preview the Book Cover Image
  openImagePreviewModal() {
    const imageUrl = this.bookForm.get('coverImageUrl')?.value;
    if (imageUrl) {
      const modalRef = this.modalService.open(ViewImageModalComponent, {
        centered: true, 
        size: 'sm',
      });
      modalRef.componentInstance.imageUrl = imageUrl;
    }
  }

}

//Custom Validator for to check for valid Image Url
export function imageUrlValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const imageUrl = control.value;

    if (imageUrl) {
      const img = new Image();

      // Set an event handler for the 'error' event
      img.onerror = () => {
        // If an error occurs (404 or other), treating it as if alt text is displayed
        control.setErrors({ invalidImageUrl: true });
      };

      img.src = imageUrl;
      const isAltTextDisplayed = img.alt.toLowerCase().includes('preview unavailable');

      return isAltTextDisplayed ? { invalidImageUrl: true } : null;
    }
    return null;
  };
}

