import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AssignedCourse } from '@rds-school/school-courses/models/school-course.model';
import { AssignedCoursesEntityService } from '@rds-store/school/assigned-courses/assigned-courses-entity.service';
import { SchoolCoursesEntityService } from '@rds-store/school/school-courses/school-courses-entity.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  templateUrl: './enrollment-dialog.component.html',
  styleUrls: ['./enrollment-dialog.component.scss'],
})
export class EnrollmentDialogComponent {
  formData: FormGroup;
  schoolCourses$: Observable<AssignedCourse[]>;
  constructor(
    public dialogRef: MatDialogRef<EnrollmentDialogComponent>,
    private fb: FormBuilder,
    private schoolCoursesEntityService: SchoolCoursesEntityService,
    private assignedCoursesEntityService: AssignedCoursesEntityService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.formData = this.fb.group({
      yi: new FormControl(data.enrollment.startYear, Validators.required),
      yf: new FormControl(data.enrollment.endYear),
      isDefault: new FormControl(data.enrollment.isDefault),
    });
    this.schoolCourses$ = this.schoolCoursesEntityService.keys$.pipe(
      map(keys => keys.map(key => {
        return {

          teacherId: '',
          studentIds: []
        } as AssignedCourse;
      })),
      map(assignedCourses => assignedCourses.map(assignedCourse => {
        let course = assignedCourse;
        this.assignedCoursesEntityService.add(assignedCourse).subscribe(assigned => course.id = assigned.id);
        return course;
      }))
    );
  }
  close() {
    this.dialogRef.close();
  }
  resetData() {
    this.formData.reset();
  }
  saveData(courses: AssignedCourse[]) {
    if (this.formData.valid) {
      this.dialogRef.close({
        isNew: this.data.isNew,
        enrollment: {
          startYear: this.formData.controls['yi'].value,
          endYear: this.formData.controls['yf'].value,
          label: `Ciclo escolar ${this.formData.controls['yi'].value}-${this.formData.controls['yf'].value}`,
          isDefault: this.formData.controls['isDefault'].value,
          assignedCourses: courses,
        }
      });
    }
  }

}
