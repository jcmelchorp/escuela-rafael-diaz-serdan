import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { faChalkboardTeacher } from '@fortawesome/free-solid-svg-icons';
import { SchoolLevel } from '@rds-auth/models/user.enum';
import { User } from '@rds-auth/models/user.model';
import { moveIn } from '@rds-shared/animations/router.animations';
import { Subscription, Observable, Subject } from 'rxjs';
import { SchoolCourse } from '../../models/school-course.model';
import { SchoolCoursesDialogComponent } from '../../components/school-courses-dialog/school-courses-dialog.component';
import { SchoolCoursesEntityService } from '@rds-store/school/school-courses/school-courses-entity.service';
import { UploadFileDialogComponent } from '../../components/upload-file/upload-file-dialog.component';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-school-courses',
  templateUrl: './school-courses.component.html',
  styleUrls: ['./school-courses.component.scss'],
  animations: [moveIn()],
})
export class SchoolCoursesComponent implements OnInit {
  loading$: Observable<boolean>;
  loaded$: Observable<boolean>;
  newClass$: Observable<SchoolCourse>;
  courseRoomsSub: Subject<SchoolCourse> = new Subject<SchoolCourse>();
  slevelKeys;
  slevels = SchoolLevel;
  faChalkboardTeacher = faChalkboardTeacher;
  filterValues: FormGroup;
  schoolCourses$: Observable<SchoolCourse[]>;
  courses$: Observable<SchoolCourse[]>;
  coursesByGrade$: Observable<SchoolCourse[]>[];
  resCount$: Observable<number>;
  willDownload = false;
  constructor(
    private fb: FormBuilder,
    private schoolCourseEntityService: SchoolCoursesEntityService,
    private dialog: MatDialog
  ) {
    this.resCount$ = this.schoolCourseEntityService.count$
    this.slevelKeys = Object.keys(this.slevels).filter((x) => x.length > 5);
    this.loaded$ = this.schoolCourseEntityService.loaded$;
    this.loading$ = this.schoolCourseEntityService.loading$;
  }

  ngOnInit() {
    this.schoolCourses$ = this.schoolCourseEntityService.entities$;
  }


  openSchoolCourseDialog(course?: SchoolCourse) {
    const newCourse: Partial<SchoolCourse> = {};
    console.log(course)
    const dialogRef = this.dialog.open(SchoolCoursesDialogComponent, {
      width: 'fit-content',
      minWidth: '400px',
      height: 'fit-content',
      data: course
        ? { course, isNew: false }
        : { course: newCourse, isNew: true },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result.isNew) {
        if (result) {
          console.log(result.course)
          this.schoolCourseEntityService.add(result.course);
        } else {
          this.schoolCourseEntityService.update(result.course);
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
          this.schoolCourseEntityService.add(x);
        });
      } else {
        console.log('Dialog closed without changes')
      }
    });
  }


}
