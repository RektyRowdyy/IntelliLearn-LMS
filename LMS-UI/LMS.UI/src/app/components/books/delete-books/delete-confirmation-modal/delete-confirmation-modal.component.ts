import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-delete-confirmation-modal',
  templateUrl: './delete-confirmation-modal.component.html',
  styleUrls: ['./delete-confirmation-modal.component.css']
})
export class DeleteConfirmationModalComponent implements OnInit {

  //Input From DeleteBookComponent
  @Input() bookTitle: string = '';

  //Return the Confirmation back to DeleteBookComponent
  @Output() confirmDelete = new EventEmitter<boolean>();

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

  onConfirmDelete(): void {
    this.confirmDelete.emit(true);
    this.closeModal();
  }

  onCancelDelete(): void {
    this.confirmDelete.emit(false);
    this.closeModal();
  }

  private closeModal(): void {
    this.activeModal.close();
  }

}
