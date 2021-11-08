import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { faChalkboardTeacher } from '@fortawesome/free-solid-svg-icons';
import { SchoolLevel } from '@rds-auth/models/user.enum';
import { moveIn } from '@rds-shared/animations/router.animations';
import { Observable, Subject } from 'rxjs';
import { AssignedCourse, SchoolCourse } from '../../models/school-course.model';
import { SchoolCourseDialogComponent } from '../../components/school-courses-dialog/school-course-dialog.component';
import { SchoolCoursesEntityService } from '@rds-store/school/school-courses/school-courses-entity.service';
import { UploadFileDialogComponent } from '@rds-shared/components/upload-file-dialog/upload-file-dialog.component';
import { AssignedCoursesEntityService } from '@rds-store/school/assigned-courses/assigned-courses-entity.service';
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
  resCount$: Observable<number>;
  willDownload = false;
  gradeKeys;
  grades = SchoolLevel;
  constructor(
    private fb: FormBuilder,
    private assignedCourseEntityService: AssignedCoursesEntityService,
    private dialog: MatDialog
  ) {
    this.resCount$ = this.assignedCourseEntityService.count$
    this.gradeKeys = Object.keys(this.grades).filter((x) => x.length > 2);
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
    this.loaded$ = this.assignedCourseEntityService.loaded$;
    this.loading$ = this.assignedCourseEntityService.loading$;
    this.filteredEntities$ = this.assignedCourseEntityService.filteredEntities$;
  }

  ngOnInit() {
    this.schoolCourses$ = this.assignedCourseEntityService.entities$;
  }


  openSchoolCourseDialog(course?: AssignedCourse) {
    const newCourse: Partial<AssignedCourse> = {};
    console.log(course)
    const dialogRef = this.dialog.open(SchoolCourseDialogComponent, {
      width: 'fit-content',
      height: 'fit-content',
      data: course
        ? { course, isNew: false }
        : { course: newCourse, isNew: true },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result.isNew) {
        if (result) {
          console.log(result.course)
          this.assignedCourseEntityService.add(result.course);
        } else {
          this.assignedCourseEntityService.update(result.course);
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
