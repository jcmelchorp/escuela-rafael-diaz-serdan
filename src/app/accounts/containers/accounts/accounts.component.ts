import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ThemePalette } from '@angular/material/core';

import { Store } from '@ngrx/store';

import { Observable, Subscription } from 'rxjs';
import { NewAccountConfirmComponent } from './../../components/new-account-confirm/new-account-confirm.component';
import { NewAccountComponent } from './../../components/new-account/new-account.component';
import { selectAccounts } from './../../state/accounts.selectors';
import { User } from '@rds-auth/models/user.model';
import { SchoolLevel, UserRole } from '@rds-auth/models/user.enum';
import { AppState } from '@rds-store/app.state';
import { AccountsEntityService } from '@rds-store/accounts/accounts-entity.service';
import { AccountsDomainService } from '../../services/accounts-domain.service';
import { MigrationProgressComponent } from '../../components/migration-progress/migration-progress.component';
import { AccountsService } from '@rds-accounts/services';


@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss'],
})
export class AccountsComponent implements OnInit, OnDestroy {
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
  links = ['tabla', 'lista'];
  activeLink: any;
  background: ThemePalette = undefined;
  subscription: Subscription;
  constructor(
    private accountsEntityService: AccountsEntityService,
    private accountsService: AccountsService,
    private store: Store<AppState>,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private accountsDomainService: AccountsDomainService
  ) {
    this.accountsDomainService.handleAdminLoad();
    this.gradeKeys = Object.keys(this.grades);
    this.roleKeys = Object.keys(this.roles);
    this.filterValues = this.fb.group({
      grade: new FormControl(),
      role: new FormControl(),
      name: new FormControl(),
      suspended: new FormControl(),
    });
    this.filterValues.valueChanges.subscribe((changes) => {
      Object.keys(changes).forEach(
        (key) => changes[key] == null && delete changes[key]
      );
      Object.keys(changes).includes('name') && changes.name !== ''
        ? (changes.name = { fullName: changes['name'] })
        : delete changes.name;
      return this.accountsEntityService.setFilter(changes);
    });

    this.filteredEntities$ = this.accountsEntityService.filteredEntities$;
    this.count$ = this.accountsEntityService.count$;
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  ngOnInit(): void {
    this.loaded$ = this.accountsEntityService.loaded$;
    this.loading$ = this.accountsEntityService.loading$;
    this.users$ = this.store.select(selectAccounts);
  }
  applyFilterString() {
    const nameForm = this.filterValues.get('name')?.value;
    const gradeForm = this.filterValues.get('grade')?.value;
    const roleForm = this.filterValues.get('role')?.value;
    const suspendedForm = this.filterValues.get('suspended')?.value;

    const name =
      nameForm === undefined || nameForm == null || nameForm == ''
        ? ''
        : nameForm;
    const grade =
      gradeForm === undefined || gradeForm == null || gradeForm == ''
        ? ''
        : gradeForm;
    const role =
      roleForm === undefined || roleForm == null || roleForm == ''
        ? ''
        : roleForm;
    const suspended =
      suspendedForm === undefined ||
        suspendedForm == null ||
        suspendedForm == ''
        ? ''
        : suspendedForm.toString();
    const filter = JSON.parse(
      JSON.stringify({ name: { fullName: name }, grade: grade, role: role })
    );
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
  sendToFirestore() {
    const accounts: User[] = [];
    this.subscription = this.accountsEntityService.entities$.subscribe((resp) => { accounts.push(...resp) });
    const dialogRef = this.dialog.open(MigrationProgressComponent, {
      width: '500px',
      height: '400px',
      data: { users: accounts, target: 'firestore' }
    })
  }
  sendToRTDB() {
    const accounts: User[] = [];
    this.subscription = this.accountsEntityService.entities$.subscribe((resp) => { accounts.push(...resp) });
    const dialogRef = this.dialog.open(MigrationProgressComponent, {
      width: '500px',
      height: '400px',
      data: { users: accounts, target: 'database' }
    })
  }
}
