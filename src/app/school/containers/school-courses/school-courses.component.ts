import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { moveIn } from '@rds-shared/animations/router.animations';
import { Cycle, SchoolCourse } from '../../models/school-course.model';

import { Router } from '@angular/router';
import { SchoolStudentsEntityService } from '@rds-store/school/school-students/school-students-entity.service';
import { map, mergeMap, switchMap, concatMap } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { SchoolCoursesEntityService } from '@rds-store/school/school-courses/school-courses-entity.service';
import { SchoolCourseDialogComponent, UploadFileDialogComponent } from '@rds-school/components';
@Component({
  selector: 'app-school-courses',
  templateUrl: './school-courses.component.html',
  styleUrls: ['./school-courses.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [moveIn()],
})
export class SchoolCoursesComponent implements OnInit {
  willDownload = false;
  activeLinkIndex = -1;
  navLinks: any[];
  studentsEmails$: Observable<string[]>;
  courses$: Observable<SchoolCourse[]>;
  subscript: Subscription;
  cycles = Cycle;
  constructor(
    private router: Router,
    private schoolCoursesEntityService: SchoolCoursesEntityService,
    private schoolStudentsEntityService: SchoolStudentsEntityService,
    private dialog: MatDialog
  ) {
    this.navLinks = [
      {
        label: 'Grupos',
        route: 'g',
        index: 0
      }, {
        label: 'Materias',
        route: ['m'],
        index: 1
      }, {
        label: 'Alumnos',
        route: ['a'],
        index: 2
      }
    ];
  }

  ngOnInit() {

  }
  populateCourses() {
    this.schoolStudentsEntityService.entities$.pipe(
      map(users => users.filter(user => user.role === 'Alumnos' && user.suspended === false)),
      mergeMap(users => this.schoolCoursesEntityService.entities$.pipe(
        map(courses => courses.filter(c => c.cycle == this.cycles.CE20212022).map(course => {
          const studentsEmails = users.filter(u => u.grade === course.grade).map(u => u.primaryEmail);
          return { ...course, studentsEmails: studentsEmails } as SchoolCourse;
        }))
      )),

    ).subscribe(courses => courses.forEach(course => /* console.log(course) */this.schoolCoursesEntityService.update(course))).unsubscribe()
  }
  editCourse(course: SchoolCourse) {
    console.log(course)
    this.schoolCoursesEntityService.update(course);
  }


  openSchoolCourseDialog(course?: SchoolCourse) {
    let coursesInGrade: number;
    const newCourse: Partial<SchoolCourse> = {};
    const dialogRef = this.dialog.open(SchoolCourseDialogComponent, {
      width: 'fit-content',
      height: 'fit-content',
      data: course
        ? { course: course, isNew: false }
        : { course: newCourse, isNew: true },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (result.isNew) {
          this.schoolCoursesEntityService.add(result.course);
        } else {
          this.editCourse(result.course);
        }
      } else {
        console.log('Dialog closed without changes')
      }
    });
  }

  saveFile() {

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

      } else {
        console.log('Dialog closed without changes')
      }
    });
  }

  handleCourseDelete(id: string) {
    this.schoolCoursesEntityService.delete(id);
  }

}
