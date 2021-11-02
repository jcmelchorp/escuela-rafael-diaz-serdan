import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import {
  faCheckCircle,
  faFileArchive,
  faThumbsDown,
  faTimesCircle,
} from '@fortawesome/free-regular-svg-icons';
import {
  faBan,
  faChalkboardTeacher,
  faCheck,
  faEllipsisV,
  faExclamation,
  faHandshakeAltSlash,
  faHouseUser,
  faScrewdriver,
  faTimes,
  faUserGraduate,
  faUserTie,
} from '@fortawesome/free-solid-svg-icons';

import { CourseState } from '@rds-classroom/models/classroom.enum';

import { CourseLevel } from '@rds-auth/models/user.enum';

@Component({
  templateUrl: './course-dialog.component.html',
  styleUrls: ['./course-dialog.component.scss'],
})
export class CourseDialogComponent implements OnInit {
  faCheckCircle = faCheckCircle;
  faTimesCircle = faTimesCircle;
  faChalkboardTeacher = faChalkboardTeacher;
  faBan = faBan;
  faElipsisV = faEllipsisV;
  faHouseUser = faHouseUser;
  facheck = faCheck;
  faStudents = faUserGraduate;
  faTeachers = faUserTie;
  faHandShake = faHandshakeAltSlash;
  faScrewDriver = faScrewdriver;
  faThumbsdown = faThumbsDown;
  faArchived = faFileArchive;
  faExclamation = faExclamation;
  faTimes = faTimes;
  keys;
  levelKeys;
  levels = CourseLevel;
  states = CourseState;
  constructor(
    private dialogRef: MatDialogRef<CourseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
    this.levelKeys = Object.keys(this.levels).filter(Number);
    this.keys = Object.keys(this.states).filter(Number);
  }

  ngOnInit(): void {}
  onStateSelection(event) {
    this.data.courseState = event.key;
  }
  onSectionSelection(event) {
    this.data.section = event.key;
  }

  close() {
    this.dialogRef.close();
  }
}
