import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  faChevronLeft,
  faUserClock,
  faUserTag,
} from '@fortawesome/free-solid-svg-icons';
import { BehaviorSubject, from, Observable, merge } from 'rxjs';
import {
  map,
  tap,
  concatMap,
} from 'rxjs/operators';
import { SubscriptionService } from '@rds-shared/services/subscription.service';
import { User } from '@rds-auth/models/user.model';
import { ScoreService } from '../../services/score.service';
import { AccountsEntityService } from '@rds-store/accounts/accounts-entity.service';
import { ScoreListItem } from '@rds-profile/models/score.model';
import { SchoolCourse } from '@rds-school/models/school-course.model';
import { SchoolCoursesEntityService } from '@rds-store/school/school-courses/school-courses-entity.service';
@Component({
  selector: 'app-scores-edit',
  templateUrl: './scores-edit.component.html',
  styleUrls: ['./scores-edit.component.scss'],
})
export class ScoresEditComponent implements OnInit, OnDestroy {
  courseId: string;
  grade: string;
  isKinder: boolean;
  suspended!: boolean;
  course: SchoolCourse;
  course$!: Observable<SchoolCourse[]>;
  students$!: Observable<User[]>;
  faChevronLeft = faChevronLeft;
  faUserClock = faUserClock;
  faUserTag = faUserTag;
  publishing$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  loaded$: Observable<boolean>;
  loading$: Observable<boolean>;
  currentGrades!: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private scoreService: ScoreService,
    private schoolCoursesEntityService: SchoolCoursesEntityService,
    private accountsEntityService: AccountsEntityService,

    private formBuilder: FormBuilder,
    private subscriptionService: SubscriptionService
  ) {
    this.loaded$ = this.schoolCoursesEntityService.loaded$;
    this.loading$ = this.schoolCoursesEntityService.loading$;

    this.courseId = this.route.snapshot.params.courseId;
    this.grade = this.route.snapshot.queryParams.grade;
    this.students$ = this.accountsEntityService.entities$
      .pipe(
        map(users => users.filter(u => u.grade == this.grade))
      );
    this.isKinder = this.grade.endsWith('Preescolar');
    this.publishing$.next(false);
  }

  ngOnInit(): void {
    /* this.students$ =  */this.schoolCoursesEntityService.entities$.pipe(
    map((cc: SchoolCourse[]) => cc.find((c) => c.id === this.courseId)),
    tap((course: SchoolCourse) => {
      this.course = course;
    }),
    /*  concatMap((course: SchoolCourse) =>
       this.accountsEntityService.entities$.pipe(
         map(users => {
           this.currentGrades = this.formBuilder.group({
             scores: this.formBuilder.array(
               course.studentsEmails.map((studentEmail) => {
                 const user = users.find(u => u.primaryEmail === studentEmail);
                 return this.setScore({ id: user.id, name: user.name.fullName })
               })
             ),
           })
           return users;
         }),
       )
     ) */
  )
  }

  async setScore(student: any): Promise<FormGroup> {
    const currentGrades = await this.scoreService.getById(student.id + this.course.cycle).toPromise()
    return this.formBuilder.group({
      studentId: [student.id, [Validators.required]],
      studentName: [student.name.fullName, Validators.required],
      courseName: [this.course.name, [Validators.required]],
      unit1: [
        !this.isKinder
          ? currentGrades.scores.find(
            (s: ScoreListItem) => s.courseName == this.course.name
          ).unit1
          : '',
      ],
      unit2: [
        !this.isKinder
          ? currentGrades.scores.find(
            (s: ScoreListItem) => s.courseName == this.course.name
          ).unit2
          : '',
      ],
      unit3: [
        !this.isKinder
          ? currentGrades.scores.find(
            (s: ScoreListItem) => s.courseName == this.course.name
          ).unit3
          : '',
      ],
      notes1: [
        currentGrades.scores.find(
          (s: ScoreListItem) => s.courseName == this.course!.name
        ).notes1,
      ],
      notes2: [
        currentGrades.scores.find(
          (s: ScoreListItem) => s.courseName == this.course.name
        ).notes2,
      ],
      notes3: [
        currentGrades.scores.find(
          (s: ScoreListItem) => s.courseName == this.course.name
        ).notes3,
      ],
      recover1: [
        !this.isKinder
          ? currentGrades.scores.find(
            (s: ScoreListItem) => s.courseName == this.course.name
          ).recover1
          : '',
      ],
      recover2: [
        !this.isKinder
          ? currentGrades.scores.find(
            (s: ScoreListItem) => s.courseName == this.course.name
          ).recover2
          : '',
      ],
      recover3: [
        !this.isKinder
          ? currentGrades.scores.find(
            (s: ScoreListItem) => s.courseName == this.course.name
          ).recover3
          : '',
      ],
      prom_materia: [
        !this.isKinder
          ? currentGrades.scores.find(
            (s: ScoreListItem) => s.courseName == this.course.name
          ).prom_materia
          : '',
      ],
      isCourseClosed: [
        currentGrades.scores.find(
          (s: ScoreListItem) => s.courseName == this.course.name
        ).isCourseClosed,
      ],
    });
  }

  async finalGrades(arrayItem: any) {
    this.publishing$.next(true);
    let partialUser: Partial<User> = {};
    const scores: ScoreListItem[] = [];
    let score: Partial<ScoreListItem> = {};
    let studentProps: any = {};
    arrayItem['_forEachChild']((control: any, name: any) => {
      if (name == 'studentId' || name == 'studentName') {
        studentProps[name] = control.value;
      } else {
        score[name] = control.value;
      }
    });

    const currentGrades = await this.scoreService.getById(studentProps.studentId + this.course.cycle).toPromise()
    let pos: number = currentGrades.scores.findIndex(
      (s) => s.courseName == score.courseName
    );
    scores.push(...currentGrades.scores);
    scores.splice(pos, 1, { ...(score as ScoreListItem) });
    let isFinished = (scores && scores.every((s) => s.isCourseClosed && s.prom_materia));
    let prom_final = isFinished ?
      scores.map((s) => s.prom_materia).reduce((a, b) => (a + b)) / scores.length : null;
    this.scoreService.update(currentGrades.id, {
      id: currentGrades.id,
      cycle: this.course.cycle,
      grade: this.course.grade,
      isFinished: isFinished,
      notes: currentGrades.notes,
      prom_final: prom_final,
      scores: scores,
      userId: studentProps.studentId,
    });

  }

  ngOnDestroy(): void {
    this.subscriptionService.unsubscribeComponent$; //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
  }
}
