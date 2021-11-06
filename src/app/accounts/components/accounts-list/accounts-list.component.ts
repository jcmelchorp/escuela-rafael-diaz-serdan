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
import { AccountsEntityService } from '@rds-root/app/store/accounts/accounts-entity.service';

@Component({
  selector: 'app-accounts-list',
  templateUrl: './accounts-list.component.html',
  styleUrls: ['./accounts-list.component.scss'],
})
export class AccountsListComponent implements OnInit {
  @Input()
  data!: User[];
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
    private toastr: ToastrService
  ) { }

  ngOnInit(): void { }
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
