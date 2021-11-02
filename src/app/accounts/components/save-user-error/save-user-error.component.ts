import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { Component, Inject } from '@angular/core';

import { faTimes, faUserTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'save-user-error',
  templateUrl: './save-user-error.component.html',
  styleUrls: ['./save-user-error.component.scss']
})
export class SaveUserErrorComponent {
  faTimes = faTimes;
  faUserTimes = faUserTimes;
  constructor(
    private snackRef: MatSnackBarRef<SaveUserErrorComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: any
  ) { }
  onClose() {
    this.snackRef.dismiss();
  }
}
