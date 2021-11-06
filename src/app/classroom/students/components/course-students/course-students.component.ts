import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

import { faBlind } from '@fortawesome/free-solid-svg-icons';

import { StudentEntityService } from '@rds-root/app/store/classroom/student/student-entity.service';


import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { GuardiansListDialogComponent } from '../guardians-list-dialog/guardians-list-dialog.component';
import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';
@Component({
  selector: 'app-course-students',
  templateUrl: './course-students.component.html',
  styleUrls: ['./course-students.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class CourseStudentsComponent implements OnInit {
  students$: Observable<gapi.client.classroom.Student[]>;
  courseId: string;
  isLoading$: Observable<boolean>;
  faBlind = faBlind;
  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private studentEntityService: StudentEntityService,
  ) {
    this.isLoading$ = this.studentEntityService.loading$;
    this.courseId = this.route.parent.parent.snapshot.paramMap.get('courseId');
    this.students$ = this.studentEntityService.entities$.pipe(
      map(students => {
        if (!students) {
          this.studentEntityService.getWithQuery(this.courseId);
        }
        return students.filter(x => x.courseId == this.courseId);
      }),
    );
  }

  ngOnInit(): void {

  }

  removeConfirm(student: gapi.client.classroom.Student) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      minWidth: '500px',
      data: { confirm: false }
    });
    dialogRef.afterClosed().subscribe(data => {
      if (data.confirm) {

        this.studentEntityService.delete(student);
      }
    })
  }

  showGuardians(userId: string) {
    const dialogRef = this.dialog.open(GuardiansListDialogComponent, {
      minWidth: '450px',
      minHeight: '550px',
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
      }
    });
  }
}



