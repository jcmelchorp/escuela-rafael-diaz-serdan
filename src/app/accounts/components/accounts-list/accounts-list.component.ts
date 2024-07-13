import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  faCircle,
  faTrashAlt,
  faUserSlash,
  faUserTag,
  faUserEdit,
  faUserCircle,
  faIdCard,
  faIdCardAlt,
} from '@fortawesome/free-solid-svg-icons';
import { ConfirmDialogComponent } from '@rds-shared/components';
import { ToastrService } from 'ngx-toastr';
import { NewAccountConfirmComponent } from './../new-account-confirm/new-account-confirm.component';
import { SaveUserErrorComponent, UserEditDialogComponent } from '..';
import { User } from '@rds-auth/models/user.model';
import { AccountsEntityService } from '@rds-store/accounts/accounts-entity.service';
import { Observable, Subscription } from 'rxjs';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '@rds-store/app.state';
import { selectAccounts } from '@rds-accounts/state/accounts.selectors';
import { UserRole, SchoolLevel } from '@rds-auth/models/user.enum';

@Component({
  selector: 'app-accounts-list',
  templateUrl: './accounts-list.component.html',
  styleUrls: ['./accounts-list.component.scss'],
})
export class AccountsListComponent implements OnInit {
  /* @Input()
  data!: User[]; */
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

  subscription: Subscription;
  faCircle = faCircle;
  faTrashAlt = faTrashAlt;
  faUserSlash = faUserSlash;
  faUserTag = faUserTag;
  faUserEdit = faUserEdit;
  faUserCircle = faUserCircle;
  faIdCard = faIdCard;
  faIdCardAlt = faIdCardAlt;
  constructor(
    private accountsEntityService: AccountsEntityService,
    private dialog: MatDialog,
    private store: Store<AppState>,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.users$ = this.store.select(selectAccounts);
    this.gradeKeys = Object.keys(this.grades);
    this.roleKeys = Object.keys(this.roles);
    this.filterValues = this.fb.group({
      grade: new FormControl(),
      role: new FormControl(),
      name: new FormControl(),
      suspended: new FormControl(),
    });
    this.subscription = this.filterValues.valueChanges.subscribe((changes) => {
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
    this.loaded$ = this.accountsEntityService.loaded$;
    this.loading$ = this.accountsEntityService.loading$;
  }
  openEditUser(user: Partial<User>) {
    const dialogRef = this.dialog.open(UserEditDialogComponent, {
      width: '60%',
      minWidth: '500px',
      height: 'fit-content',
      minHeight: '400px',
      data: { user, action: 'actualiza', isInGoogle: true, modified: false },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (!result) {
        console.log('Creating New User Canceled');
      } else {
        if (result.isInGoogle == true) {
          const user: Partial<User> = {
            id: result.id,
            name: {
              givenName: result.name.givenName,
              familyName: result.name.familyName,
              fullName: [result.name.givenName, result.name.familyName].join(
                ' '
              ),
            },
            password: result.password,
            gender: result.gender,
            dob: result.dob,
            role: result.role,
            grade: result.grade,
            level: result.level,
          };
          this.accountsEntityService.update(user).subscribe(
            (user) =>
              this.dialog.open(NewAccountConfirmComponent, {
                width: 'fit-content',
                minWidth: '450px',
                height: 'fit-content',
                minHeight: '300px',
                data: { ...user, action: 'Actualiza' },
              }),
            (error) =>
              this.dialog.open(SaveUserErrorComponent, {
                width: 'fit-content',
                height: 'fit-content',
                data: { ...error },
              })
          );
        } else {
        }
      }
    });
  }

  openSuspendUser(user: Partial<User>) {
    const action: string = user.suspended ? 'habilita' : 'inhabilita';
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        user,
        action: action,
        subject: 'usuario',
        description: '¿Estás seguro de esta acción?',
        confirm: false,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      let user: Partial<User> = { ...result.user };
      if (result.confirm) {
        user.suspended = !user.suspended;
        this.accountsEntityService.update(user, { isOptimistic: true }).subscribe(
          (user) =>
            this.toastr.success(
              `Usuario ${user.name?.fullName} fue ${result.action}do con éxito en la institución`,
              `${result.action}ción exitosa`
            ),
          (error) =>
            this.toastr.error(
              `Error al ${result.action}r ${result.subject} en la institución: ${error.message}`,
              `Error en la ${result.action}ción`
            )
        );
      } else {
        this.toastr.warning(
          `${user.name?.fullName} no fue ${result.action}do`,
          `${result.action}ción cancelada`
        );
      }
    });
  }
  openDeleteUser(user: Partial<User>) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        user,
        action: 'elimina',
        subject: 'usuario',
        description: '¿Estás seguro de esta acción?',
        confirm: false,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      result.confirm
        ? this.accountsEntityService.delete(result.user.id)
        : this.toastr.warning(
          `${result.user.name.fullName} no fue ${result.action}do`,
          `${result.action}ción cancelada`
        );
    });
  }
}
