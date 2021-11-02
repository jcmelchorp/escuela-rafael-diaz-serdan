import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { State } from '@rds-classroom/models/classroom.enum';
import { Link } from '@rds-classroom/models/classroom.model';
import { CourseLevel } from '@rds-auth/models/user.enum';
@Component({
  templateUrl: './announcement-dialog.component.html',
  styleUrls: ['./announcement-dialog.component.scss'],
})
export class AnnouncementDialogComponent implements OnInit {
  @ViewChild('cfcAutosize')
  contentFCAutosize: CdkTextareaAutosize;
  faTimes = faTimes;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  keys;
  states = State;
  levelKeys;
  levels = CourseLevel;
  newLink: Link;
  constructor(
    private dialogRef: MatDialogRef<AnnouncementDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
    this.keys = Object.keys(this.states).filter(Number);
    this.levelKeys = Object.keys(this.levels).filter(Number);
  }

  ngOnInit(): void {}
  onStateSelection(event) {
    this.data.newAnnouncement.state = event.key;
  }
  onSectionSelection(event) {
    this.data.section = event.key;
  }
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    const link: Link = {
      url: value.trim(),
      thumbnailUrl:
        'https://www.myschnauzers.ca/wp-content/uploads/2017/11/icon-form-1.png',
      title: '',
    };
    if ((value || '').trim()) {
      this.data.newAnnouncement.materials.push({ link: link });
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(link: Link): void {
    const index = this.data.newAnnouncement.materials.indexOf(link);

    if (index >= 0) {
      this.data.newAnnouncement.materials.splice(index, 1);
    }
  }

  close() {
    this.dialogRef.close();
  }
}
