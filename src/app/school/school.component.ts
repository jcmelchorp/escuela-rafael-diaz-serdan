import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewAccountComponent, NewAccountConfirmComponent } from '@rds-accounts/components';
import { User } from '@rds-auth/models/user.model';
import { EnrollmentsEntityService } from '@rds-store/school/enrollments/enrollments-entity.service';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { EnrollmentDialogComponent } from './enrollments/components/enrollment-dialog/enrollment-dialog.component';
import { Enrollment, EnrollmentLabel } from './enrollments/models/enrollment.model';
import { EnrollmentsService } from './enrollments/services/enrollments.service';
import { Cycle } from './school-courses/models/cycle.enum';

@Component({
  selector: 'app-school',
  templateUrl: './school.component.html',
  styleUrls: ['./school.component.scss']
})
export class SchoolComponent implements OnInit {
  enrollments$: Observable<EnrollmentLabel[]>
  enrollment$: Observable<Enrollment>
  selectedId: string;
  cycleKeys;
  cycles = Cycle;
  constructor(
    private dialog: MatDialog,
    private enrollmentsService: EnrollmentsService,
    private enrollmentsEntityService: EnrollmentsEntityService,
  ) {
    this.cycleKeys = Object.keys(this.cycles).filter((x) => x.length > 5);
  }

  ngOnInit(): void {
  }
  openEnrollmentDialog(enrollment?: Enrollment) {
    const newEnrollment: Partial<Enrollment> = {};
    const dialogRef = this.dialog.open(EnrollmentDialogComponent, {
      width: 'fit-content',
      height: 'fit-content',
      minHeight: '200px',
      data: enrollment ?
        { enrollment, isNew: false } :
        { enrollment: newEnrollment, isNew: true },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (!result) {
        console.log('Creating New User Canceled');
      } else {
        if (result.isNew) {
          this.enrollmentsEntityService.add(result.enrollment);
        } else {
          this.enrollmentsEntityService.update(result.enrollment.id, result.enrollment);
        }
      }
    });
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
}

