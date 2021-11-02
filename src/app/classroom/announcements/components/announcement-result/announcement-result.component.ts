import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  faCheckCircle,
  faTimesCircle,
} from '@fortawesome/free-regular-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}
@Component({
  templateUrl: './announcement-result.component.html',
  styleUrls: ['./announcement-result.component.scss'],
})
export class AnnouncementResultComponent implements OnInit {
  faTimes = faTimes;
  faCheckCircle = faCheckCircle;
  faTimesCircle = faTimesCircle;

  constructor(
    private dialogRef: MatDialogRef<AnnouncementResultComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {}

  ngOnInit(): void {}
  close() {
    this.dialogRef.close();
  }
}
