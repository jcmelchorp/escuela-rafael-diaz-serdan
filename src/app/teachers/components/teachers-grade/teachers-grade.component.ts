import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

import { mergeMap, switchMap, take, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { User } from '@rds-auth/models/user.model';
import { Assigment } from '../../../classroom/models/classroom.model';
import { AssignedCourse } from '../../../school/school-courses/models/school-course.model';
import { AccountsEntityService } from '../../../store/accounts/accounts-entity.service';
import { AssignedCoursesEntityService } from '@rds-store/school/assigned-courses/assigned-courses-entity.service';
import { ScoreListItem } from '@rds-profile/models/score.model';


@Component({
  selector: 'app-teachers-grade',
  templateUrl: './teachers-grade.component.html',
  styleUrls: ['./teachers-grade.component.scss'],
})
export class TeachersGradeComponent implements OnInit {
  courseId: string;
  course!: AssignedCourse | undefined;
  students$!: Observable<User[]>;
  faChevronLeft = faChevronLeft;
  loading$!: Observable<boolean>;
  loaded$!: Observable<boolean>;
  formGrades!: FormGroup;
  studentsSubscription!: Subscription;
  dataSource = new BehaviorSubject<AbstractControl[]>([]);
  displayColumns = ['studentName', 'unit1', 'unit2', 'unit3', 'action'];
  currentGrades!: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private assignedCoursesEntityService: AssignedCoursesEntityService,
    private accountsEntityService: AccountsEntityService,
    private fb: FormBuilder
  ) {
    this.courseId = this.route.snapshot.params.courseId;
    /* this.formGrades = this.fb.group({
      scores: this.fb.array([])
    }) */
  }
  /*  updateView() {
     this.dataSource.next(this.scores.controls);
   } */
  ngOnInit(): void {
    this.students$ = this.assignedCoursesEntityService.entities$.pipe(
      map((cc: AssignedCourse[]) => cc.find((c) => c.id === this.courseId)),
      tap((course: AssignedCourse) => {
        this.course = course;
      }),
      mergeMap((course: AssignedCourse) =>
        this.accountsEntityService.entities$.pipe(
          map(users => {
            this.currentGrades = this.fb.group({
              scores: this.fb.array(
                course.studentsEmails.map((studentEmail) => {
                  const user = users.find(u => u.primaryEmail === studentEmail);
                  return this.setScore({ id: user.id, name: user.name.fullName })
                })
              ),
            })
            return users;
          }),
        )
      )
    )
  }
  setScore(student: any): FormGroup {
    return this.fb.group({
      studentId: [student.id],
      studentName: [student.name.fullName],
      courseName: [this.course!.name],
      unit1: [
        student.currentGrades.scores.find(
          (s: any) => s.courseName == this.course!.name
        ).unit1,
      ],
      unit2: [
        student.currentGrades.scores.find(
          (s: any) => s.courseName == this.course!.name
        ).unit2,
      ],
      unit3: [
        student.currentGrades.scores.find(
          (s: any) => s.courseName == this.course!.name
        ).unit3,
      ],
      notes1: [
        student.currentGrades.scores.find(
          (s: any) => s.courseName == this.course!.name
        ).notes1,
      ],
      notes2: [
        student.currentGrades.scores.find(
          (s: any) => s.courseName == this.course!.name
        ).notes2,
      ],
      notes3: [
        student.currentGrades.scores.find(
          (s: any) => s.courseName == this.course!.name
        ).notes3,
      ],
      recover1: [
        student.currentGrades.scores.find(
          (s: any) => s.courseName == this.course!.name
        ).recover1,
      ],
      recover2: [
        student.currentGrades.scores.find(
          (s: any) => s.courseName == this.course!.name
        ).recover2,
      ],
      recover3: [
        student.currentGrades.scores.find(
          (s: any) => s.courseName == this.course!.name
        ).recover3,
      ],
      final: [
        student.currentGrades.scores.find(
          (s: any) => s.courseName == this.course!.name
        ).final,
      ],
      isCourseClosed: [
        student.currentGrades.scores.find(
          (s: any) => s.courseName == this.course!.name
        ).isCourseClosed,
      ],
    });
  }

  get scores(): FormArray {
    return this.formGrades.get('scores') as FormArray;
  }

  finalGrades(arrayItem: any) {
    let partialUser: Partial<User> = {};
    let score: Partial<ScoreListItem> = {};
    let studentProps: any = {};
    arrayItem['_forEachChild']((control: any, name: any) => {
      if (name == 'studentId' || name == 'studentName') {
        studentProps[name] = control.value;
      } else {
        //score[name] = control.value;
      }
    });
    if (score.isCourseClosed)
      score.prom_materia =
        +Math.trunc((+(score.unit1 + score.unit2 + score.unit3) * 10) / 3) /
        10;

    return partialUser;
  }



  onChange() {
    this.currentGrades.get('');
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
  }
}
