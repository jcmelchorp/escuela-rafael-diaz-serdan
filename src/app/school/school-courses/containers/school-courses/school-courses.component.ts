import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { SchoolLevel } from '@rds-auth/models/user.enum';
import { moveIn } from '@rds-shared/animations/router.animations';
import { Observable, Subject } from 'rxjs';
import { AssignedCourse, SchoolCourse } from '../../models/school-course.model';
import { SchoolCourseDialogComponent } from '../../components/school-courses-dialog/school-course-dialog.component';
import { UploadFileDialogComponent } from '@rds-shared/components/upload-file-dialog/upload-file-dialog.component';
import { AssignedCoursesEntityService } from '@rds-store/school/assigned-courses/assigned-courses-entity.service';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-school-courses',
  templateUrl: './school-courses.component.html',
  styleUrls: ['./school-courses.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [moveIn()],
})
export class SchoolCoursesComponent implements OnInit {
  loading$: Observable<boolean>;
  loaded$: Observable<boolean>;
  filterValues: FormGroup;
  schoolCourses$: Observable<AssignedCourse[]>;
  filteredEntities$: Observable<AssignedCourse[]>;
  coursesCount$: Observable<number>;
  willDownload = false;
  gradeKeys;
  grades = SchoolLevel;
  constructor(
    private fb: FormBuilder,
    private assignedCourseEntityService: AssignedCoursesEntityService,
    private dialog: MatDialog
  ) {
    this.loaded$ = this.assignedCourseEntityService.loaded$;
    this.loading$ = this.assignedCourseEntityService.loading$;
    this.schoolCourses$ = this.assignedCourseEntityService.entities$;

    this.filteredEntities$ = this.assignedCourseEntityService.filteredEntities$;
    this.gradeKeys = Object.keys(this.grades);
    this.filterValues = this.fb.group({
      grade: new FormControl(),
      name: new FormControl(),
    });
    this.filterValues.valueChanges.subscribe((changes) => {
      Object.keys(changes).forEach(
        (key) => changes[key] == null && delete changes[key]
      );
      Object.keys(changes).includes('name') && changes.name !== ''
        ? (changes.name = { fullName: changes['name'] })
        : delete changes.name;
      return this.assignedCourseEntityService.setFilter(changes);
    });

    this.coursesCount$ = this.assignedCourseEntityService.count$

  }


  ngOnInit() {
  }

  editCourse(course: AssignedCourse) {
    console.log(course)
    this.assignedCourseEntityService.update(course);
  }


  openSchoolCourseDialog(course?: AssignedCourse) {
    let coursesInGrade: number;
    const newCourse: Partial<AssignedCourse> = {};
    const dialogRef = this.dialog.open(SchoolCourseDialogComponent, {
      width: 'fit-content',
      height: 'fit-content',
      data: course
        ? { course: course, isNew: false }
        : { course: newCourse, isNew: true },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (result.isNew) {
          this.assignedCourseEntityService.add(result.course);
        } else {
          this.editCourse(result.course);
        }
      } else {
        console.log('Dialog closed without changes')
      }
    });
  }

  loadFile() {
    const dialogRef = this.dialog.open(UploadFileDialogComponent, {
      width: 'fit-content',
      minWidth: '700px',
      height: 'fit-content',
      data: { output: [] },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log(result)
        result.output.forEach((x) => {
          this.assignedCourseEntityService.add(x);
        });
      } else {
        console.log('Dialog closed without changes')
      }
    });
  }

  handleCourseDelete(id: string) {
    this.assignedCourseEntityService.delete(id);
  }

}
