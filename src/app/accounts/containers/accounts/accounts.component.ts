import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewAccountConfirmComponent } from './../../components/new-account-confirm/new-account-confirm.component';
import { NewAccountComponent } from './../../components/new-account/new-account.component';
import { User } from '@rds-auth/models/user.model';
import { AdminApiService } from '@rds-admin/services';
@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss'],
})
export class AccountsComponent implements OnInit {
  constructor(private dialog: MatDialog, private adminApiService: AdminApiService,

  ) {
  }
  ngOnInit(): void { }
  onCreateUser() {
    this.adminApiService.handleAdminLoad();
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
