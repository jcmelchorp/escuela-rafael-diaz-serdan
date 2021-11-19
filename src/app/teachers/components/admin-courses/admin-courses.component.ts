import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { Store } from '@ngrx/store';

import { Observable, Subscription } from 'rxjs';
import { map, mergeMap, switchMap, concatMap, tap } from 'rxjs/operators';
import { AppState } from '@rds-store/app.state';
import { SchoolLevel } from '@rds-auth/models/user.enum';
import { User } from '@rds-auth/models/user.model';
import { selectUser } from '@rds-auth/state/auth.selectors';
import { moveIn } from '@rds-shared/animations/router.animations';
import { AccountsEntityService } from '@rds-store/accounts/accounts-entity.service';
import { AssignedCoursesEntityService } from '@rds-store/school/assigned-courses/assigned-courses-entity.service';
import { AssignedCourse } from '@rds-school/models/school-course.model';
import { SchoolTeachersService } from '@rds-school/services/school-tearchers.service';

@Component({
  selector: 'app-admin-courses',
  templateUrl: './admin-courses.component.html',
  styleUrls: ['./admin-courses.component.scss'],
  animations: [moveIn()],
})
export class AdminCoursesComponent implements OnInit, OnDestroy {
  courses$!: Observable<AssignedCourse[]>;
  searchedCourses$!: Observable<AssignedCourse[]>;
  teachers$: Observable<User[]>;
  loading$!: Observable<boolean>;
  loaded$!: Observable<boolean>;
  userId!: string;
  slevelKeys;
  slevels = SchoolLevel;
  searchForm!: FormGroup;
  formSubscription!: Subscription;
  periods$: Observable<string[]>;
  selectedCicle = '20202021';
  constructor(
    private teachersCoursesService: SchoolTeachersService,
    private assignedCoursesEntityService: AssignedCoursesEntityService,
    private accountsEntityService: AccountsEntityService,
    private fb: FormBuilder,
    private store: Store<AppState>
  ) {
    this.slevelKeys = Object.keys(this.slevels).filter((x) => x.length > 5);
    this.store.select(selectUser).subscribe((user) => (this.userId = user.id));
    this.initSearchForm();
    this.teachers$ = this.accountsEntityService.entities$.pipe(
      map((users) =>
        users
          .filter((u) => u.isTeacher == true)
          .sort((a, b) =>
            compare(a.name?.familyName!, b.name?.familyName!, true)
          )
      )
    );
  }
  get cycle() {
    return this.searchForm.get('cicle');
  }
  get grade() {
    return this.searchForm.get('grade');
  }
  get teacherId() {
    return this.searchForm.get('teacherId');
  }
  ngOnInit(): void {
    let cycle: string = this.cycle?.value as string;
    this.courses$ = this.assignedCoursesEntityService.entities$
    this.searchedCourses$ = this.courses$;
  }
  initSearchForm() {
    this.searchForm = this.fb.group({
      grade: new FormControl(),
      tacherId: new FormControl(),
      cycle: new FormControl(),
    });
    this.searchForm.patchValue({
      grade: '',
      teacherId: '',
      cycle: this.cycle.value,
    });
  }

  onSearch() {
    let cicle: string = this.cycle?.value as string;
    /* this.searchedCourses$ = this.teachersCoursesService..pipe(
      map((courses) => {
        if (this.grade?.value == '' && this.teacherId?.value == '')
          return courses;
        if (this.grade?.value == '')
          return courses.filter(
            (s) => s.teacherId == this.teacherId?.value
          );
        if (this.teacherId?.value == '')
          return courses.filter(
            (s) => s.grade?.toString() == this.grade?.value
          );
        return [];
      }),
    ); */
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
  }
}
function compare(
  a: string | number,
  b: string | number,
  isAsc: boolean
): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
