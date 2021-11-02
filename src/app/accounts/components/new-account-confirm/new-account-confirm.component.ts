import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { faTimes, faUserCheck } from '@fortawesome/free-solid-svg-icons';

@Component({
  templateUrl: './new-account-confirm.component.html',
  styleUrls: ['./new-account-confirm.component.scss']
})
export class NewAccountConfirmComponent implements OnInit {
  faTimes = faTimes;
  faUserCheck = faUserCheck;
  constructor(
    private dialogRef: MatDialogRef<NewAccountConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
  }
  onClose() {
    this.dialogRef.close();
  }
  printPage() {
    window.print();
  }
}
