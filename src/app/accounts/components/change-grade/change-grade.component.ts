import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { faTimes, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { CourseLevel, SchoolLevel } from '@rds-auth/models/user.enum';

@Component({
  templateUrl: './change-grade.component.html',
  styleUrls: ['./change-grade.component.scss'],
})
export class ChangeGradeComponent implements OnInit {
  faTimes = faTimes;
  faUserPlus = faUserPlus;
  saveForm!: FormGroup;

  clevelKeys: string[];
  clevels: any = CourseLevel;
  slevelKeys: string[];
  slevels: any = SchoolLevel;
  constructor(
    private dialogRef: MatDialogRef<ChangeGradeComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.clevelKeys = Object.keys(this.clevels).filter(Number);
    this.slevelKeys = Object.keys(this.slevels).filter((x) => x.length > 5);
    this.initForm();
  }

  ngOnInit(): void { }
  initForm() {
    this.saveForm = this.fb.group({
      grade: new FormControl(this.data.grade),
      level: new FormControl(this.data.level),
      isInGoogle: new FormControl(this.data.isInGoogle),
    });
  }

  onClose() {
    this.dialogRef.close();
  }
  onSubmit() {
    if (!this.saveForm.get('isInGoogle')?.value) {
      this.data = {
        grade: this.saveForm.get('grade')?.value,
        level: this.saveForm.get('level')?.value,
        orgUnitPath: ['/Dirección', 'Alumnos'].join('/'),
      };
      if (
        this.saveForm.get('level')?.value != null &&
        this.saveForm.get('grade')?.value != null
      ) {
        this.data.orgUnitPath = [
          this.data.orgUnitPath,
          this.saveForm.get('level')?.value,
          this.saveForm.get('grade')?.value,
        ].join('/');
      }
    }
    this.dialogRef.close(this.data);
  }
}
