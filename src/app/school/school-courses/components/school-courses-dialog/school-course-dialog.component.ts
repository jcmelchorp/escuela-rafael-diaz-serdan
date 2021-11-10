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
import { Cycle } from '../../models/cycle.enum';

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
  cycleKeys;
  cycles = Cycle
  constructor(
    private dialogRef: MatDialogRef<SchoolCourseDialogComponent>,
    private accountEntityService: AccountsEntityService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.keys = Object.keys(this.types);
    this.cycleKeys = Object.keys(this.cycles);
    this.slevelKeys = Object.keys(this.slevels);
    this.teachers$ = this.accountEntityService.entities$.pipe(
      map((users) => users.filter((u) => u.isTeacher == true))
    );
    this.formData = this.fb.group({
      name: new FormControl(this.data.course.name, Validators.required),
      grade: new FormControl(this.data.course.grade),
      courseType: new FormControl(this.data.course.courseType),
      cycle: new FormControl(this.data.course.cycle),
      description: new FormControl(this.data.course.description),
      teacherId: new FormControl(this.data.course.teacherId),
      priority: new FormControl(this.data.course.priority),
    });
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
    const course: Partial<AssignedCourse> = {
      id: this.data.course.id,
      name: this.formData.controls.name.value,
      priority: this.data.course.priority,
      cycle: this.formData.controls.cycle.value,
      description: this.formData.controls.description.value,
      courseType: this.formData.controls.courseType.value,
      teacherId: this.formData.controls.teacherId.value,
      grade: this.formData.controls.grade.value,
    };
    //!this.data.isNew ? course.id = this.data.course.id : null;
    this.dialogRef.close({
      course: course,
      isNew: this.data.isNew,
    });
  }
  close() {
    this.dialogRef.close();
  }

}
