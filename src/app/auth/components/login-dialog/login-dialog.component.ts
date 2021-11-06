import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { faDoorOpen, faTimes } from '@fortawesome/free-solid-svg-icons';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

import { Store } from '@ngrx/store';

import * as fromAuthActions from '@rds-auth/state/auth.actions';

import { AppState } from '@rds-root/app/store/app.state';

@Component({
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss'],
})
export class LoginDialogComponent {
  faGoogle = faGoogle;
  faTimes = faTimes;
  faDoorOpen = faDoorOpen;

  constructor(
    private dialogRef: MatDialogRef<LoginDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private store: Store<AppState>
  ) { }

  onLogin() {
    this.store.dispatch(fromAuthActions.signIn());
  }

  close() {
    this.dialogRef.close();
  }
}
