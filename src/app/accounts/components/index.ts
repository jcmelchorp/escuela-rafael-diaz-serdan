import { AccountsListComponent } from './accounts-list/accounts-list.component';
import { AccountsTableComponent } from './accounts-table/accounts-table.component';
import { ChangeGradeComponent } from './change-grade/change-grade.component';
import { NewAccountConfirmComponent } from './new-account-confirm/new-account-confirm.component';
import { NewAccountComponent } from './new-account/new-account.component';
import { UserEditDialogComponent } from './user-edit-dialog/user-edit-dialog.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { SaveUserErrorComponent } from './save-user-error/save-user-error.component';
import { UsersListComponent } from './users-list/users-list.component';
import { MigrationProgressComponent } from './migration-progress/migration-progress.component';

export const accountsComponents: any[] = [
  UserEditDialogComponent,
  SaveUserErrorComponent,
  UsersListComponent,
  UserDetailsComponent,
  ChangeGradeComponent,
  AccountsTableComponent,
  AccountsListComponent,
  MigrationProgressComponent,
  NewAccountComponent,
  NewAccountConfirmComponent
]
export * from './user-edit-dialog/user-edit-dialog.component';
export * from './new-account-confirm/new-account-confirm.component';
export * from './save-user-error/save-user-error.component';
export * from './change-grade/change-grade.component';
export * from './user-details/user-details.component';
export * from './users-list/users-list.component';
export * from './accounts-table/accounts-table.component';
export * from './accounts-list/accounts-list.component';
export * from './new-account/new-account.component';
export * from './migration-progress/migration-progress.component';
