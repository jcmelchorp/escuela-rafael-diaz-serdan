import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { faChalkboardTeacher } from '@fortawesome/free-solid-svg-icons';
import { SchoolLevel } from '@rds-auth/models/user.enum';
import { moveIn } from '@rds-shared/animations/router.animations';
import { Observable, Subject } from 'rxjs';
import { AssignedCourse, SchoolCourse } from '../../models/school-course.model';
import { SchoolCourseDialogComponent } from '../../components/school-courses-dialog/school-course-dialog.component';
import { SchoolCoursesEntityService } from '@rds-store/school/school-courses/school-courses-entity.service';
import { UploadFileDialogComponent } from '@rds-shared/components/upload-file-dialog/upload-file-dialog.component';
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
    const newCourse: Partial<AssignedCourse> = {};
    console.log(course)
    const dialogRef = this.dialog.open(SchoolCourseDialogComponent, {
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

  handleCourseDelete(id: string) {
    this.schoolCourseEntityService.delete(id);
  }

}
