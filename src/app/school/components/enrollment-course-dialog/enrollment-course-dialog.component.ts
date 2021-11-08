import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from '@firebase/util';
import { SchoolCourse } from '@rds-school/models/school-course.model';
import { SchoolCoursesEntityService } from '@rds-store/school/school-courses/school-courses-entity.service';

@Component({
  selector: 'app-enrollment-course-dialog',
  templateUrl: './enrollment-course-dialog.component.html',
  styleUrls: ['./enrollment-course-dialog.component.scss']
})
export class EnrollmentCourseDialogComponent {
  formData: FormGroup;
  enrollments$: Observable<SchoolCourse[]>
  constructor(
    public dialogRef: MatDialogRef<EnrollmentCourseDialogComponent>,
    private fb: FormBuilder,
    private schoolCoursesEntityService: SchoolCoursesEntityService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.formData = this.fb.group({
      yi: new FormControl(data.yearInit, Validators.required),
      yf: new FormControl(data.yearFinal),
    });
  }
}
