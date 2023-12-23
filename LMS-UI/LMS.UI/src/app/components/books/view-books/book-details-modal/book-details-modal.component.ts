import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-book-details-modal',
  templateUrl: './book-details-modal.component.html',
  styleUrls: ['./book-details-modal.component.css']
})
export class BookDetailsModalComponent implements OnInit {

  @Input() book: any;

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
    console.log('BookDetailsModalComponent - ngOnInit:', this.book);
  }

}
