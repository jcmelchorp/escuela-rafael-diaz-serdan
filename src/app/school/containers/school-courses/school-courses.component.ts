import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-school-courses',
  templateUrl: './school-courses.component.html',
  styleUrls: ['./school-courses.component.scss'],
  animations: [moveIn()],
})
export class SchoolCoursesComponent implements OnInit {
  courseRooms: SchoolCourse[];
  coursesSubscription: Subscription;
  teachers$: Observable<User[]>;
  loading_users$: Observable<boolean>;
  loaded_users$: Observable<boolean>;
  loading_courses$: Observable<boolean>;
  loaded_courses$: Observable<boolean>;
  newClass$: Observable<SchoolCourse>;
  courseRoomsSub: Subject<SchoolCourse> = new Subject<SchoolCourse>();
  slevelKeys;
  slevels = SchoolLevel;
  faChalkboardTeacher = faChalkboardTeacher;
  filterValues: FormGroup;
  filteredEntities$: Observable<SchoolCourse[]>;
  courses$: Observable<SchoolCourse[]>;
  coursesByGrade$: Observable<SchoolCourse[]>[];
  resCount$: Observable<number>;


  constructor(
    private fb: FormBuilder,
    private schoolCourseEntityService: SchoolCoursesEntityService,
    //private accountsEntityService: AccountsEntityService,
    private dialog: MatDialog
  ) {
    this.resCount$ = this.schoolCourseEntityService.count$
    this.loaded_courses$ = this.schoolCourseEntityService.loaded$;
    this.loading_courses$ = this.schoolCourseEntityService.loading$;
    this.slevelKeys = Object.keys(this.slevels).filter((x) => x.length > 5);
    this.filterValues = this.fb.group({
      name: new FormControl(),
      grade: new FormControl(),
    });
    this.filterValues.valueChanges.subscribe((changes) => {
      Object.keys(changes).forEach(
        (key) => changes[key] == null && delete changes[key]
      );
      return this.schoolCourseEntityService.setFilter(changes);
    });
    this.filteredEntities$ = this.schoolCourseEntityService.filteredEntities$;
  }

  ngOnInit() {
  }



  applyFilterString() {
    const nameForm: string = (this.filterValues.get('name').value as string);
    const gradeForm: string = this.filterValues.get('grade').value as string;
    const name = nameForm === undefined || nameForm == null || nameForm == '' ? '' : nameForm.toLocaleLowerCase();
    const grade = gradeForm === undefined || gradeForm == null || gradeForm == '' ? '' : gradeForm;
    const filter = JSON.parse(
      JSON.stringify({ name: name, grade: grade })
    );
  }

  openSchoolCourseDialog(course?: SchoolCourse) {
    const newCourse: Partial<SchoolCourse> = {};
    const dialogRef = this.dialog.open(SchoolCoursesDialogComponent, {
      width: 'fit-content',
      minWidth: '400px',
      height: 'fit-content',
      data: course
        ? { course, isNew: false }
        : { course: newCourse, isNew: true },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (result.isNew) {
          this.schoolCourseEntityService.add(result.course);
        } else {
          this.schoolCourseEntityService.update(result.course);
        }
      } else {
        console.log('Dialog closed without changes')
      }
    });
  }

  handleCourseDelete(course: SchoolCourse) {
    this.schoolCourseEntityService.delete(course);
  }

}
