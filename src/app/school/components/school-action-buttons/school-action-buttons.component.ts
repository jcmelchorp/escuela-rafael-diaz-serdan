import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Cycle, SchoolClassroom, SchoolCourse } from '@rds-school/models/school-course.model';
import { SchoolClassroomsEntityService } from '@rds-store/school/school-classrooms/school-classrooms-entity.service';
import { SchoolCoursesEntityService } from '@rds-store/school/school-courses/school-courses-entity.service';
import { from, Observable } from 'rxjs';
import { SelectCycleDialogComponent } from '../select-cycle-dialog/select-cycle-dialog.component';
import { UserRole } from '@rds-auth/models/user.enum';
import { concatMap, map, mergeMap, pluck, switchMap, tap } from 'rxjs/operators';
import { SchoolClassroomsService } from '@rds-school/services/school-classrooms.service';
import { AccountsEntityService } from '@rds-store/accounts/accounts-entity.service';
import { SchoolLevel } from '@rds-auth/models/user.enum';
import { SchoolClassroomDialogComponent } from '@rds-school/components/school-classroom-dialog/school-classroom-dialog.component';
import { SchoolCourseDialogComponent } from '../school-course-dialog/school-course-dialog.component';
import { UploadFileDialogComponent } from '../upload-file-dialog/upload-file-dialog.component';
import { SchoolService } from '@rds-school/services';

@Component({
  selector: 'app-school-action-buttons',
  templateUrl: './school-action-buttons.component.html',
  styleUrls: ['./school-action-buttons.component.scss']
})
export class SchoolActionButtonsComponent implements OnInit {
  @Input() classrooms: SchoolClassroom[];
  courses$: Observable<SchoolCourse[]>;
  coursesCount$: Observable<number>;
  roles = UserRole;
  cycles = Cycle;
  levels = SchoolLevel;
  constructor(
    private schoolCoursesEntityService: SchoolCoursesEntityService,
    private accountsEntityService: AccountsEntityService,
    private schoolService: SchoolService,
    private schoolClassroomsEntityService: SchoolClassroomsEntityService,
    private schoolClassroomsService: SchoolClassroomsService,
    private dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    this.coursesCount$ = this.schoolCoursesEntityService.count$;
    this.courses$ = this.schoolCoursesEntityService.entities$;
  }
  poulateCoursesWithStudents(classrooms: SchoolClassroom[]) {
    const dialogRef = this.dialog.open(SelectCycleDialogComponent, {
      width: 'fit-content',
      height: 'fit-content',
      data: { cycle: Cycle }
    });
    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.classrooms.filter(c => c.cycle === data.cycle).map(
          classroom =>
            this.accountsEntityService.entities$.pipe(
              map(users => {
                const students = users.filter(u => u.grade === classroom.grade)
                const studentsEmails = students.map(s => s.primaryEmail);
                return { ...classroom, studentsEmails: studentsEmails, students: students } as SchoolClassroom;
              }),
              mergeMap(classroom => classroom.studentsEmails.map(async email => this.schoolService.addStudentEmailToClassroom(classroom.id, email))))
        )
      } else {
        console.log('Dialog closed without changes')
      }
    });
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
