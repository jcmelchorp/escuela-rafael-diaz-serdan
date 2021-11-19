import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { moveIn } from '@rds-shared/animations/router.animations';
import { AssignedCourse } from '../../models/school-course.model';
import { SchoolCourseDialogComponent } from '../../components/school-courses-dialog/school-course-dialog.component';
import { UploadFileDialogComponent } from '@rds-shared/components/upload-file-dialog/upload-file-dialog.component';
import { AssignedCoursesEntityService } from '@rds-store/school/assigned-courses/assigned-courses-entity.service';

import { Router } from '@angular/router';
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

  constructor(
    private router: Router,
    private assignedCoursesEntityService: AssignedCoursesEntityService,
    private dialog: MatDialog
  ) {
    this.navLinks = [
      {
        label: 'Materias',
        link: 'c',
        index: 0
      }, {
        label: 'Alumnos',
        link: 'a',
        index: 1
      }
    ];
  }

  ngOnInit() {
    this.router.events.subscribe((res) => {
      this.activeLinkIndex = this.navLinks.indexOf(this.navLinks.find(tab => tab.link === '.' + this.router.url));
    });
  }

  editCourse(course: AssignedCourse) {
    console.log(course)
    this.assignedCoursesEntityService.update(course);
  }


  openSchoolCourseDialog(course?: AssignedCourse) {
    let coursesInGrade: number;
    const newCourse: Partial<AssignedCourse> = {};
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
          this.assignedCoursesEntityService.add(result.course);
        } else {
          this.editCourse(result.course);
        }
      } else {
        console.log('Dialog closed without changes')
      }
    });
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
        result.output.forEach((x) => {
          this.assignedCoursesEntityService.add(x);
        });
      } else {
        console.log('Dialog closed without changes')
      }
    });
  }

  handleCourseDelete(id: string) {
    this.assignedCoursesEntityService.delete(id);
  }

}
