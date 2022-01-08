import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewAccountComponent, NewAccountConfirmComponent } from '@rds-accounts/components';
import { User } from '@rds-auth/models/user.model';
import { fadeInAnimation, heightReveal } from '@rds-shared/animations/fade-in.animation';
@Component({
  selector: 'app-school',
  templateUrl: './school.component.html',
  styleUrls: ['./school.component.scss'],
  animations: [heightReveal], //[@fadeIn]="'fadeIn'"
})
export class SchoolComponent implements OnInit {
  navLinks: any[];
  selectedId: string;
  //cycleKeys;
  //cycles = Cycle;
  constructor(
    private dialog: MatDialog,
  ) {
    //this.cycleKeys = Object.keys(this.cycles).filter((x) => x.length > 5);
  }

  ngOnInit(): void {
    this.navLinks = [
      {
        label: 'Materias',
        icon: 'auto_stories',
        route: 'm',
        index: 1
      },
      {
        label: 'Inscripciones',
        icon: 'follow_the_signs',
        route: 'i',
        index: 0
      }
    ];
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

