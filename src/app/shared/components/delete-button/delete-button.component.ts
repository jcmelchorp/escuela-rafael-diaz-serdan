import { Component, Output, EventEmitter } from '@angular/core';

import { faTimes, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-delete-button',
  templateUrl: './delete-button.component.html',
  styleUrls: ['./delete-button.component.scss']
})
export class DeleteButtonComponent {
  canDelete: boolean;
  faTrashAlt = faTrashAlt;
  faTimes = faTimes;
  @Output() delete = new EventEmitter<boolean>();

  cancel(): void {
    this.canDelete = false;
  }

  prepareForDelete(): void {
    this.canDelete = true;
  }

  deleteElement(): void {
    this.delete.emit(true);
    this.canDelete = false;
  }


}
