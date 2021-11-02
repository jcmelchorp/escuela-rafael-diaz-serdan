import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  templateUrl: './course-user-dialog.component.html',
  styleUrls: ['./course-user-dialog.component.scss']
})
export class CourseUserDialogComponent implements OnInit {
  faTimes = faTimes;
  constructor(
    public dialogRef: MatDialogRef<CourseUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
  }
  close() {
    this.dialogRef.close();
  }
}
