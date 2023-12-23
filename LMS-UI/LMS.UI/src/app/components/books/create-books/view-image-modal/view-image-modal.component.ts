import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-view-image-modal',
  templateUrl: './view-image-modal.component.html',
  styleUrls: ['./view-image-modal.component.css']
})
export class ViewImageModalComponent implements OnInit {

  @Input() imageUrl: string = '';
  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  closeModal() {
    this.modalService.dismissAll();
  }

}
