import { Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { selectUser } from '@rds-auth/state/auth.selectors';
import { User } from '@rds-auth/models/user.model';
import { AppState } from '@rds-store/app.state';
import { Observable, Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { moveInLeft } from '@rds-shared/animations/router.animations';
import { AssignedCourse } from '@rds-school/school-courses/models/school-course.model';
import { AssignedCoursesEntityService } from '@rds-store/school/assigned-courses/assigned-courses-entity.service';
import { AccountsEntityService } from '../../../store/accounts/accounts-entity.service';


@Component({
  selector: 'app-teacher-courses',
  templateUrl: './teacher-courses.component.html',
  styleUrls: ['./teacher-courses.component.scss'],
  animations: [moveInLeft()],
})
export class TeacherCoursesComponent implements OnInit {
  courses$!: Observable<AssignedCourse[]>;
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
    private assignedCoursesEntityService: AssignedCoursesEntityService,
    private accountsEntityService: AccountsEntityService
  ) {
    this.loading_courses$ = this.assignedCoursesEntityService.loading$;
    this.initSearchForm();
    this.teacherSubscription = this.store
      .select(selectUser)
      .subscribe((user) => {
        this.currentTeacher = user;
        this.searchForm.patchValue({
          teacherId: user.id,
        });
        return user;
      });
    this.teachers$ = this.accountsEntityService.entities$.pipe(
      map(users => users.filter(u => u.role == 'Profesores'))
    );
  }

  ngOnInit(): void {
    this.onSearch();
  }

  get searchString() {
    return this.searchForm.get('searchString');
  }
  get teacherId() {
    return this.searchForm.get('mainTeacherId');
  }

  onSearch() {
    let name: string = this.searchString.value.toLocaleLowerCase();
    let teacherId: string = this.teacherId.value;
    this.courses$ = this.assignedCoursesEntityService.entities$.pipe(
      map((courses) => {
        if (!courses) {
          this.assignedCoursesEntityService.getWithQuery({
            field: 'teacherId',
            operation: '==',
            value: teacherId,
          });
        }
        if (name == '' && teacherId == '') return courses;
        if (name == '')
          return courses.filter((c) => c.teacherId === teacherId);
        if (teacherId == '')
          return courses.filter((c) =>
            c.name.toLocaleLowerCase().includes(name)
          );

        return courses.filter(
          (c) =>
            c.name.toLocaleLowerCase().includes(name) &&
            c.teacherId == teacherId
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
              const teacher = users.find((u) => u.id == course.teacherId);
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
      teacherId: new FormControl('', Validators.required),
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
