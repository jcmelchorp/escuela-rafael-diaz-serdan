import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SchoolLevel } from '@rds-auth/models/user.enum';
import { Cycle, SchoolClassroom } from '../../models/school-course.model';

@Component({
  templateUrl: './school-classroom-dialog.component.html',
  styleUrls: ['./school-classroom-dialog.component.scss']
})
export class SchoolClassroomDialogComponent implements OnInit {
  slevelKeys;
  slevels = SchoolLevel;
  cycleKeys;
  cycles = Cycle;
  formData: FormGroup;
  constructor(
    private dialogRef: MatDialogRef<SchoolClassroomDialogComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.cycleKeys = Object.keys(this.cycles);
    this.slevelKeys = Object.keys(this.slevels);
    this.formData = this.fb.group({
      grade: new FormControl(this.data.classroom.grade),
      cycle: new FormControl(this.data.classroom.cycle),
    });
  }

  ngOnInit(): void {
  }
  saveData() {
    const classroom: SchoolClassroom = {
      id: this.data.classroom.id,
      grade: this.formData.controls.grade.value,
      cycle: this.formData.controls.cycle.value,
      coursesIds: [],
      studentsEmails: []
    };
    //!this.data.isNew ? course.id = this.data.course.id : null;
    this.dialogRef.close({
      classroom: classroom,
      isNew: this.data.isNew,
    });
  }
  close() {
    this.dialogRef.close();
  }
  resetData() {
    this.formData.reset();
  }
}
