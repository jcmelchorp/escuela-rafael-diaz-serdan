import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Cycle, SchoolClassroom, SchoolCourse } from '@rds-school/models/school-course.model';
import { SchoolClassroomsEntityService } from '@rds-store/school/school-classrooms/school-classrooms-entity.service';
import { SchoolCoursesEntityService } from '@rds-store/school/school-courses/school-courses-entity.service';
import { Observable } from 'rxjs';
import { SchoolClassroomDialogComponent, SchoolCourseDialogComponent, UploadFileDialogComponent } from '..';
import { SelectCycleDialogComponent } from '../select-cycle-dialog/select-cycle-dialog.component';
import { SchoolStudentsEntityService } from '@rds-store/school/school-students/school-students-entity.service';
import { UserRole } from '@rds-auth/models/user.enum';
import { map, mergeMap, pluck, switchMap, tap } from 'rxjs/operators';
import { SchoolClassroomsService } from '@rds-school/services/school-classrooms.service';
import { AccountsEntityService } from '../../../store/accounts/accounts-entity.service';
import { SchoolLevel } from '../../../auth/models/user.enum';

@Component({
  selector: 'app-school-action-buttons',
  templateUrl: './school-action-buttons.component.html',
  styleUrls: ['./school-action-buttons.component.scss']
})
export class SchoolActionButtonsComponent implements OnInit {
  courses$: Observable<SchoolCourse[]>;
  coursesCount$: Observable<number>;
  classrooms$: Observable<SchoolClassroom[]>;
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
    this.coursesCount$ = this.schoolCoursesEntityService.count$;
  }

  ngOnInit(): void {
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
          map(users => users.filter(user => user.role == "alumnos" && user.suspended === false)),
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
  editCourse(course: SchoolClassroom) {
    this.schoolCoursesEntityService.update(course as Partial<SchoolCourse>);
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
    let coursesInGrade: number;
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
          this.editCourse(result.classroom);
        }
      } else {
        console.log('Dialog closed without changes')
      }
    });
  }

  saveFile() {

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
        console.log(result)

      } else {
        console.log('Dialog closed without changes')
      }
    });
  }

  handleCourseDelete(id: string) {
    this.schoolCoursesEntityService.delete(id);
  }
}
