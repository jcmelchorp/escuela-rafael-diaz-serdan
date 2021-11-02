import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';


import { User } from '@rds-auth/models/user.model';


import { NewCicleDialogComponent } from '../../components/new-cicle-dialog/new-cicle-dialog.component';
import { SchoolService } from '../../services/school.service';
import { NewAccountComponent } from '../../../accounts/components/new-account/new-account.component';
import { NewAccountConfirmComponent } from '../../../accounts/components/new-account-confirm/new-account-confirm.component';
import { AccountDomain } from '../../../accounts/models/account-domain.model';

@Component({
  selector: 'app-school',
  templateUrl: './school.component.html',
  styleUrls: ['./school.component.scss'],
})
export class SchoolComponent implements OnInit {
  newUser: AccountDomain;
  constructor(
    private dialog: MatDialog,
    private schoolService: SchoolService
  ) { }

  ngOnInit(): void { }
  newCicle() {
    const dialogRef = this.dialog.open(NewCicleDialogComponent, {
      width: 'fit-content',
      minWidth: '300px',
      height: 'fit-content',
      minHeight: '200px',
      data: { yearInit: '', yearFinal: '' },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (!result) {
        console.log('Creating New User Canceled');
      } else {
        this.schoolService.createPeriod(result.yearInit, result.yearFinal);
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
