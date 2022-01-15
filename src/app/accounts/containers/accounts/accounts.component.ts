import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ThemePalette } from '@angular/material/core';
import { Observable, Subscription } from 'rxjs';
import { NewAccountConfirmComponent } from './../../components/new-account-confirm/new-account-confirm.component';
import { NewAccountComponent } from './../../components/new-account/new-account.component';
import { User } from '@rds-auth/models/user.model';
import { SchoolLevel, UserRole } from '@rds-auth/models/user.enum';
import { AccountsEntityService } from '@rds-store/accounts/accounts-entity.service';
import { MigrationProgressComponent } from '../../components/migration-progress/migration-progress.component';


@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss'],
})
export class AccountsComponent implements OnInit {
  loaded$: Observable<boolean>;
  loading$: Observable<boolean>;
  users$: Observable<User[]>;
  count$: Observable<number>;
  roleKeys: string[];
  roles = UserRole;
  gradeKeys: string[];
  grades = SchoolLevel;
  filterValues: FormGroup;
  filteredEntities$: Observable<User[]>;
  links = ['', 'list', 'edit'];
  navLinks: any[];
  activeLink: any;
  background: ThemePalette = undefined;
  subscription: Subscription;
  constructor(
    private dialog: MatDialog,
  ) {
    this.navLinks = [
      {
        label: 'Usuarios',
        icon: 'people',
        route: 'accounts',
        index: 1
      },
      {
        label: 'Lista',
        icon: 'follow_the_signs',
        route: 'list',
        index: 0
      },
    ];
    this.activeLink = this.navLinks[0]
  }

  ngOnInit(): void {

  }
  onCreateUser() {
    let firebaseUser: User;
    const dialogRef = this.dialog.open(NewAccountComponent, {
      width: '600px',
      minWidth: 'fit-content',
      height: 'fit-content',
      minHeight: '400px',
      data: { googleUser: {}, firebaseUser: {} },
    });
    dialogRef.afterClosed().subscribe((resp) => {
      if (resp) {
        firebaseUser = resp.firebaseUser;
        this.dialog.open(NewAccountConfirmComponent, {
          width: '600px',
          minWidth: 'fit-content',
          height: 'fit-content',
          minHeight: '400px',
          data: { ...firebaseUser, action: 'crea' },
        });
      }
    });
  }

}
