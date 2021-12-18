import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Cycle, SchoolClassroom, SchoolCourse } from '../../models/school-course.model';
import { MatDialog } from '@angular/material/dialog';
import { SchoolCoursesEntityService } from '@rds-store/school/school-courses/school-courses-entity.service';
import { Observable, Subject, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { SchoolClassroomsEntityService } from '@rds-store/school/school-classrooms/school-classrooms-entity.service';
import { NewAccountComponent, NewAccountConfirmComponent } from '@rds-accounts/components';
import { UserRole, SchoolLevel } from '@rds-auth/models/user.enum';
import { SelectCycleDialogComponent, SchoolCourseDialogComponent, SchoolClassroomDialogComponent, UploadFileDialogComponent } from '@rds-school/components';
import { SchoolClassroomsService } from '@rds-school/services';
import { heightReveal } from '@rds-shared/animations/fade-in.animation';
import { AccountsEntityService } from '@rds-store/accounts/accounts-entity.service';
import { map, mergeMap, switchMap } from 'rxjs/operators';
import { User } from '@rds-auth/models/user.model';

@Component({
  selector: 'app-school-classrooms',
  templateUrl: './school-classrooms.component.html',
  styleUrls: ['./school-classrooms.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [heightReveal],
})
export class SchoolClassroomsComponent implements OnInit {
  classrooms$: Observable<SchoolClassroom[]>;
  classroom$: Observable<SchoolClassroom>;
  coursesCount$: Observable<number>;
  selectedClassroom$: Subject<SchoolClassroom> = new Subject<SchoolClassroom>();
  filledClassroom: SchoolClassroom;
  roles = UserRole;
  cycles = Cycle;
  levels = SchoolLevel;
  constructor(
    private schoolCoursesEntityService: SchoolCoursesEntityService,
    private accountsEntityService: AccountsEntityService,
    private schoolClassroomsEntityService: SchoolClassroomsEntityService,
    private schoolClassroomsService: SchoolClassroomsService,
    private dialog: MatDialog,
  ) {

  }

  ngOnInit(): void {
    this.coursesCount$ = this.schoolCoursesEntityService.count$;
    this.classrooms$ = this.schoolClassroomsEntityService.entities$;
  }
  assignCoursesToClassroom() { }
  deliveryDocument() { }
  saveFile() { }
  notify(classroom: SchoolClassroom) {
    this.filledClassroom = { ...classroom };
    this.classroom$ = this.accountsEntityService.entities$.pipe(
      map(users => {
        const students = this.filledClassroom.studentsEmails.map(
          email => users.find(user => user.primaryEmail === email));
        return { ...classroom, students }
      }),
      switchMap(classroom => this.schoolCoursesEntityService.entities$.pipe(
        map(schoolCourses => {
          const courses = this.filledClassroom.coursesIds.map(
            courseId =>
              schoolCourses.find(course => course.id === courseId))
          return { ...classroom, courses }
        })
      ))
    );
    //this.selectedClassroom$.next(this.filledClassroom);
  }
  openSaveUser() {
    const user: User = this.blankUser();
    const dialogRef = this.dialog.open(NewAccountComponent, {
      width: '60%',
      minWidth: '500px',
      height: 'fit-content',
      minHeight: '400px',
      data: { user, action: 'crea', isInGoogle: false },
    });
    dialogRef.afterClosed().subscribe(async (result) => {
      if (!result) {
        console.log('Creating New User Canceled');
      } else {
        this.dialog.open(NewAccountConfirmComponent, {
          data: { ...result },
        });
      }
    });
  }
  blankUser() {
    let user: User = {
      id: '',
      password: '',
      primaryEmail: '',
      name: {
        givenName: '',
        familyName: '',
        fullName: '',
      },
      isHuman: true,
      gender: '',
      dob: '',
      role: '',
      orgUnitPath: '',
      level: '',
      grade: '',
    };
    return user;
  }
  populateCourses() {
    const dialogRef = this.dialog.open(SelectCycleDialogComponent, {
      width: 'fit-content',
      height: 'fit-content',
      data: { cycle: Cycle }
    });
    dialogRef.afterClosed().subscribe((cycle) => {
      if (cycle) {
        this.accountsEntityService.entities$.pipe(
          map(users => users.filter(user => user.role == "Alumnos" && user.suspended === false)),
          mergeMap(users => this.schoolClassroomsEntityService.entities$.pipe(
            map(classrooms => classrooms.filter(c => c.cycle == this.cycles[cycle]).map(classroom => {
              const studentsEmails = users.filter(u => u.grade === classroom.grade).map(u => u.primaryEmail);
              return { ...classroom, studentsEmails: studentsEmails } as SchoolClassroom;
            }))
          )),
          switchMap(async (classrooms) => classrooms.forEach(classroom => this.schoolClassroomsEntityService.update(classroom)))
        )
      }
    })
  }
  editCourse(course: SchoolCourse) {
    this.schoolCoursesEntityService.update(course as Partial<SchoolCourse>);
  }
  editClassroom(classroom: SchoolClassroom) {
    return this.schoolClassroomsEntityService.update(classroom as Partial<SchoolClassroom>);
  }
  // TODO:incluir filtrado por cycle
  coursesOnLevel(classroom: SchoolClassroom) {
    const classToEdit: SchoolClassroom = { ...classroom };
    this.schoolCoursesEntityService.entities$.pipe(
      map(courses => courses
        .filter(course => course.grade === classroom.grade)
        .filter(course => course.cycle === classroom.cycle)
      ),
      map(courses => {
        classToEdit.coursesIds.push(...courses.map(course => course.id));
        this.editClassroom(classroom)
      })
    )
  }

  openSchoolCourseDialog(course?: SchoolCourse) {
    const newCourse: Partial<SchoolCourse> = {};
    const dialogRef = this.dialog.open(SchoolCourseDialogComponent, {
      width: 'fit-content',
      minWidth: '480px',
      height: 'fit-content',
      maxHeight: '600px',
      data: course
        ? { course: course, isNew: false }
        : { course: newCourse, isNew: true },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (result.isNew) {
          let ids: string[] = [];
          this.schoolCoursesEntityService.add(result.course).pipe(
            map(course => this.schoolClassroomsService.getWithQuery({ grade: course.grade }).pipe(
              map(classrooms => {
                console.log(classrooms);
                const classroom = classrooms.find(cl => cl.cycle === course.cycle);
                //ids.push(...classrooms[0].coursesIds);
                ids.push(course.id);
                return {
                  id: classroom.id,
                  grade: classroom.grade,
                  cycle: classroom.cycle,
                  studentsEmails: classroom.studentsEmails,
                  coursesIds: ids
                } as SchoolClassroom;
              })
            ).subscribe(classroom => this.schoolClassroomsEntityService.update({ ...classroom }))),
          )

        } else {
          this.editCourse(result.course);
        }
      } else {
        console.log('Dialog closed without changes')
      }
    });
  }

  openSchoolClassroomDialog(classroom?: SchoolClassroom) {
    const newClassroom: Partial<SchoolClassroom> = {};
    const dialogRef = this.dialog.open(SchoolClassroomDialogComponent, {
      width: 'fit-content',
      minWidth: '400px',
      height: 'fit-content',
      data: classroom
        ? { classroom: classroom, isNew: false }
        : { classroom: newClassroom, isNew: true },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (result.isNew) {
          this.schoolClassroomsEntityService.add(result.classroom);
        } else {
          this.editClassroom(result.classroom);
        }
      } else {
        console.log('Dialog closed without changes')
      }
    });
  }

  loadCoursesFile() {
    const dialogRef = this.dialog.open(UploadFileDialogComponent, {
      width: 'fit-content',
      minWidth: '700px',
      height: 'fit-content',
      data: { output: [] },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {


      } else {
        console.log('Dialog closed without changes')
      }
    });
  }

  handleCourseDelete(id: string) {
    this.schoolCoursesEntityService.delete(id);
  }
}
