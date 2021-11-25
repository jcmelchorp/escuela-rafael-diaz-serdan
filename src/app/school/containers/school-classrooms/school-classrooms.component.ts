import { Component, OnDestroy, OnInit } from '@angular/core';
import { SchoolCourseDialogComponent, UploadFileDialogComponent } from '@rds-school/components';
import { Cycle, SchoolClassroom, SchoolCourse } from '../../models/school-course.model';
import { SchoolClassroomDialogComponent } from '../../components/school-classroom-dialog/school-classroom-dialog.component';
import { map, mergeMap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { SchoolCoursesEntityService } from '@rds-store/school/school-courses/school-courses-entity.service';
import { SchoolStudentsEntityService } from '@rds-store/school/school-students/school-students-entity.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { SchoolClassroomsEntityService } from '../../../store/school/school-classrooms/school-classrooms-entity.service';
import { SelectCycleDialogComponent } from '@rds-school/components/select-cycle-dialog/select-cycle-dialog.component';

@Component({
  selector: 'app-school-classrooms',
  templateUrl: './school-classrooms.component.html',
  styleUrls: ['./school-classrooms.component.scss']
})
export class SchoolClassroomsComponent implements OnInit/* , OnDestroy */ {
  willDownload = false;
  activeLinkIndex = -1;
  navLinks: any[];
  studentsEmails$: Observable<string[]>;
  courses$: Observable<SchoolClassroom[]>;
  classrooms$: Observable<SchoolClassroom[]>;

  subscript: Subscription;
  cycles = Cycle;
  constructor(
    private router: Router,
    private schoolCoursesEntityService: SchoolCoursesEntityService,
    private schoolClassroomsEntityService: SchoolClassroomsEntityService,
    private dialog: MatDialog,
  ) {
  }

  ngOnInit() {

  }



}
