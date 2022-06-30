import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
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
  formData: UntypedFormGroup;
  constructor(
    private dialogRef: MatDialogRef<SchoolClassroomDialogComponent>,
    private fb: UntypedFormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.cycleKeys = Object.keys(this.cycles);
    this.slevelKeys = Object.keys(this.slevels);
    this.formData = this.fb.group({
      grade: new UntypedFormControl(this.data.classroom.grade, Validators.required),
      cycle: new UntypedFormControl(this.data.classroom.cycle, Validators.required),
    });
    //console.log(this.data)
  }
  saveData() {
    this.dialogRef.close({
      classroom: new SchoolClassroom({
        id: this.data.classroom.id,
        grade: this.formData.controls.grade.value,
        cycle: this.formData.controls.cycle.value,
      }),
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
