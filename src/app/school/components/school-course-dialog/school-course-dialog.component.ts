import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, UntypedFormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { faTimes, faBook } from '@fortawesome/free-solid-svg-icons';
import { User } from '@rds-auth/models/user.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CourseType, SchoolCourse, Cycle } from '../../models/school-course.model';
import { AccountsEntityService } from '@rds-store/accounts/accounts-entity.service';
import { SchoolLevel } from '@rds-auth/models/user.enum';
import { SchoolTeachersEntityService } from '@rds-store/school/school-teachers/school-teacher-entity.service';

@Component({
  templateUrl: './school-course-dialog.component.html',
  styleUrls: ['./school-course-dialog.component.scss']
})
export class SchoolCourseDialogComponent {
  teachers$: Observable<User[]>;
  periods$: Observable<string[]>;
  faTimes = faTimes;
  faBook = faBook;

  formData: UntypedFormGroup;
  keys;
  types = CourseType;
  slevelKeys;
  slevels = SchoolLevel;
  cycleKeys;
  cycles = Cycle
  constructor(
    private dialogRef: MatDialogRef<SchoolCourseDialogComponent>,
    private accountsEntityService: AccountsEntityService,
    private fb: UntypedFormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.keys = Object.keys(this.types);
    this.cycleKeys = Object.keys(this.cycles);
    this.slevelKeys = Object.keys(this.slevels);
    this.accountsEntityService.setFilter({ role: 'Profesores', suspended: false });
    this.teachers$ = this.accountsEntityService.filteredEntities$;
    this.formData = this.fb.group({
      name: new UntypedFormControl(this.data.course.name, Validators.required),
      grade: new UntypedFormControl(this.data.course.grade),
      courseType: new UntypedFormControl(this.data.course.courseType),
      cycle: new UntypedFormControl(this.data.course.cycle),
      description: new UntypedFormControl(this.data.course.description),
      teacherEmail: new UntypedFormControl(this.data.course.teacherEmail),
      priority: new UntypedFormControl(this.data.course.priority),
    });

  }

  resetData() {
    this.formData.reset();
  }
  saveData() {
    const course: Partial<SchoolCourse> = {
      id: this.data.course.id,
      name: this.formData.controls.name.value,
      priority: this.data.course.priority,
      cycle: this.formData.controls.cycle.value,
      description: this.formData.controls.description.value,
      courseType: this.formData.controls.courseType.value,
      teacherEmail: this.formData.controls.teacherEmail.value,
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
