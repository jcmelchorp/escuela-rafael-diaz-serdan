import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { CourseLevel } from '@rds-auth/models/user.enum';

@Component({
  selector: 'app-group-dialog',
  templateUrl: './group-dialog.component.html',
  styleUrls: ['./group-dialog.component.scss'],
})
export class GroupDialogComponent {
  faTimes = faTimes;
  levelKeys: any;
  levels = CourseLevel;
  constructor(
    public dialogRef: MatDialogRef<GroupDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.levelKeys = Object.keys(this.levels).filter(Number);
  }
  onLevelSelection(event: any) {
    this.data.group.level = event.key;
  }
  onClose(): void {
    this.dialogRef.close();
  }
}
