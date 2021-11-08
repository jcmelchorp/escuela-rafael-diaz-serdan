import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { faTimes, faBook } from '@fortawesome/free-solid-svg-icons';
import { User } from '@rds-auth/models/user.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CourseType, SchoolCourse, AssignedCourse } from '../../models/school-course.model';
import { AccountsEntityService } from '@rds-store/accounts/accounts-entity.service';
import { SchoolLevel } from '@rds-auth/models/user.enum';

@Component({
  templateUrl: './school-course-dialog.component.html',
  styleUrls: ['./school-course-dialog.component.scss']
})
export class SchoolCourseDialogComponent {
  teachers$: Observable<User[]>;
  periods$: Observable<string[]>;
  faTimes = faTimes;
  faBook = faBook;

  formData: FormGroup;
  keys;
  types = CourseType;
  slevelKeys;
  slevels = SchoolLevel;
  constructor(
    private dialogRef: MatDialogRef<SchoolCourseDialogComponent>,
    private accountEntityService: AccountsEntityService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.keys = Object.keys(this.types).filter((x) => x.length > 5);
    this.slevelKeys = Object.keys(this.slevels).filter((x) => x.length > 5);
    this.formData = this.fb.group({
      name: new FormControl(this.data.course.name, Validators.required),
      grade: new FormControl(this.data.course.grade),
      courseType: new FormControl(this.data.course.courseType),
      description: new FormControl(this.data.course.description),
    });
    /* this.periods$ = this.roomService.getPeriods();
    this.rooms$ = this.roomService
      .getRoomsOnCicle(this.data.course.cicle)
      .pipe(
        map((rooms) => rooms.filter((r) => r.status.toString() == 'activo'))
      ); */
    this.teachers$ = this.accountEntityService.entities$.pipe(
      map((users) => {
        return users.filter((x) => x.isTeacher == true && x.suspended == false);
      })
    );
  }

  resetData() {
    this.formData.reset();
  }
  saveData() {
    if (this.formData.valid) {
      this.dialogRef.close({
        course: { ...this.data.course, ...this.formData.value },
        isNew: this.data.isNew,
      });
    }
  }
  close() {
    this.dialogRef.close();
  }

}
