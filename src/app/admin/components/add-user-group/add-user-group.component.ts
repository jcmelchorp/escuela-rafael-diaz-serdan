import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-user-group',
  templateUrl: './add-user-group.component.html',
  styleUrls: ['./add-user-group.component.scss']
})
export class AddUserGroupComponent {

  constructor(
    public dialogRef: MatDialogRef<AddUserGroupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }


  onClose(): void {
    this.dialogRef.close();
  }
}
