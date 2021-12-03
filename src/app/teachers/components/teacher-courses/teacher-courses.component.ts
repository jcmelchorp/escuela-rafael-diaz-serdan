import { Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { selectUser } from '@rds-auth/state/auth.selectors';
import { User } from '@rds-auth/models/user.model';
import { AppState } from '@rds-store/app.state';
import { Observable, Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { moveInLeft } from '@rds-shared/animations/router.animations';
import { SchoolTeachersEntityService } from '@rds-store/school/school-teachers/school-teacher-entity.service';
import { SchoolCourse } from '@rds-school/models/school-course.model';
import { SchoolCoursesEntityService } from '@rds-store/school/school-courses/school-courses-entity.service';


@Component({
  selector: 'app-teacher-courses',
  templateUrl: './teacher-courses.component.html',
  styleUrls: ['./teacher-courses.component.scss'],
  animations: [moveInLeft()],
})
export class TeacherCoursesComponent implements OnInit {
  courses$!: Observable<SchoolCourse[]>;
  isAdmin$!: Observable<boolean>;
  currentTeacher!: User;
  teachers$: Observable<User[]>;
  searchForm!: FormGroup;
  teacherSubscription: Subscription;
  selectedCicle: Observable<{ id: string, cicle: string }>;
  loading_courses$: Observable<boolean>;
  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private schoolCoursesEntityService: SchoolCoursesEntityService,
    private schoolTeachersEntityService: SchoolTeachersEntityService
  ) {
    this.loading_courses$ = this.schoolCoursesEntityService.loading$;
    this.initSearchForm();
    this.teacherSubscription = this.store
      .select(selectUser)
      .subscribe((user) => {
        this.currentTeacher = user;
        this.searchForm.patchValue({
          teacherEmail: user.primaryEmail,
        });
        return user;
      });
    this.teachers$ = this.schoolTeachersEntityService.entities$;
  }

  ngOnInit(): void {
    this.onSearch();
  }

  get searchString() {
    return this.searchForm.get('searchString');
  }
  get teacherEmail() {
    return this.searchForm.get('teacherEmail');
  }

  onSearch() {
    let name: string = this.searchString.value.toLocaleLowerCase();
    let teacherEmail: string = this.teacherEmail.value;
    this.courses$ = this.schoolCoursesEntityService.entities$.pipe(
      map((courses) => {
        if (!courses) {
          this.schoolCoursesEntityService.getWithQuery({
            field: 'teacherId',
            operation: '==',
            value: teacherEmail,
          });
        }
        if (name == '' && teacherEmail == '') return courses;
        if (name == '')
          return courses.filter((c) => c.teacherEmail === teacherEmail);
        if (teacherEmail == '')
          return courses.filter((c) =>
            c.name.toLocaleLowerCase().includes(name)
          );

        return courses.filter(
          (c) =>
            c.name.toLocaleLowerCase().includes(name) &&
            c.teacherEmail == teacherEmail
        );
      }),
      /* switchMap((courses) =>
        this.roomService.getRoomsOnCicle(this.selectedCicle.id).pipe(
          map((rooms) =>
            courses.map((course) => {
              //const room = rooms.find((r) => r.id == course.roomId);
              return { ...course, grade: course.grade };
            })
          )
        )
      ), */
      switchMap((courses) =>
        this.teachers$.pipe(
          map((users) =>
            courses.map((course) => {
              const teacher = users.find((u) => u.primaryEmail == course.teacherEmail);
              return { ...course, teacher: teacher };
            })
          )
        )
      )
    );
  }

  initSearchForm() {
    this.searchForm = this.fb.group({
      searchString: new FormControl(''),
      teacherEmail: new FormControl('', Validators.required),
    });
  }
  ngOnDestroy(): void {
    this.teacherSubscription.unsubscribe();
  }
}

function compare(
  a: string | number,
  b: string | number,
  isAsc: boolean
): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
