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
import { User } from '@rds-auth/models/user.model';
import { SchoolTeachersEntityService } from '@rds-store/school/school-teachers/school-teacher-entity.service';
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
  teachers_loaded$: Observable<boolean>;
  teachers_loading$: Observable<boolean>;
  filterValues: FormGroup;
  schoolCourses$: Observable<AssignedCourse[]>;
  filteredEntities$: Observable<AssignedCourse[]>;
  teachers$: Observable<User[]>;
  coursesCount$: Observable<number>;
  willDownload = false;
  gradeKeys;
  grades = SchoolLevel;
  constructor(
    private fb: FormBuilder,
    private schoolTeachersEntityService: SchoolTeachersEntityService,
    private assignedCoursesEntityService: AssignedCoursesEntityService,
    private dialog: MatDialog
  ) {
    this.loaded$ = this.assignedCoursesEntityService.loaded$;
    this.loading$ = this.assignedCoursesEntityService.loading$;
    this.schoolCourses$ = this.assignedCoursesEntityService.entities$;
    this.teachers$ = this.schoolTeachersEntityService.entities$;
    this.teachers_loading$ = this.schoolTeachersEntityService.loading$;
    this.teachers_loaded$ = this.schoolTeachersEntityService.loaded$;

    this.filteredEntities$ = this.assignedCoursesEntityService.filteredEntities$;
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
      return this.assignedCoursesEntityService.setFilter(changes);
    });

    this.coursesCount$ = this.assignedCoursesEntityService.count$

  }


  ngOnInit() {
  }

  editCourse(course: AssignedCourse) {
    console.log(course)
    this.assignedCoursesEntityService.update(course);
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
          this.assignedCoursesEntityService.add(result.course);
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
          this.assignedCoursesEntityService.add(x);
        });
      } else {
        console.log('Dialog closed without changes')
      }
    });
  }

  handleCourseDelete(id: string) {
    this.assignedCoursesEntityService.delete(id);
  }

}
