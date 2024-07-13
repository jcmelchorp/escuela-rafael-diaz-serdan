import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { faTimes, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { AccountDomain, UserInsert } from '@rds-accounts/models/account-domain.model';
import { UserRole, CourseLevel, SchoolLevel } from '@rds-auth/models/user.enum';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserEditDialogComponent } from '../user-edit-dialog/user-edit-dialog.component';
import { User } from '@rds-auth/models/user.model';
import { AccountsDomainEntityService } from '@rds-store/accounts-domain/accounts-domain-entity.service';
import { AccountsEntityService } from '@rds-store/accounts/accounts-entity.service';

@Component({
  selector: 'app-user-edit-password',
  templateUrl: './user-edit-password.component.html',
  styleUrls: ['./user-edit-password.component.scss']
})
export class UserEditPasswordComponent {
  faTimes = faTimes;
  faUserPlus = faUserPlus;
  hide: boolean = false;
  saveForm!: FormGroup;
  roles = UserRole;
  rolekeys: string[];
  newUser!: Observable<AccountDomain>;
  clevelKeys: string[];
  clevels: any = CourseLevel;
  slevelKeys: string[];
  slevels: any = SchoolLevel;
  googleError: any;
  firebaseError: any;
  googleError$!: Observable<any>;
  creating: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  created: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  creating$: Observable<boolean> = this.creating.asObservable();
  created$: Observable<boolean> = this.created.asObservable();
  constructor(
    private accountsDomainEntityService: AccountsDomainEntityService,
    private dialogRef: MatDialogRef<UserEditPasswordComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.initForm();
  }

  initForm() {
    this.saveForm = this.fb.group({
      givenName: new FormControl(this.data.user.name.givenName, [
        Validators.required,
      ]),
      familyName: new FormControl(this.data.user.name.familyName, [
        Validators.required,
      ]),
      primaryEmail: new FormControl(this.data.user.primaryEmail, [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl(this.data.user.password!),
      changePasswordAtNextLogin: new FormControl(this.data.user.changePasswordAtNextLogin!),
    });
  }
  onSubmit() {
    if (this.data.isNew != true) {
      this.creating.next(true);
      this.created.next(false);
      //this.adminService.handleAdminLoad()
      const tryUser: UserInsert = {
        id: this.data.user.id,
        // name: {
        //   givenName: this.saveForm.get('givenName')?.value,
        //   familyName: this.saveForm.get('familyName')?.value,
        // },
        // primaryEmail: this.saveForm.get('primaryEmail')?.value,
        password: this.saveForm.get('password')?.value,
      };

      this.accountsDomainEntityService.update({ ...tryUser, userKey: this.data.user.id } as AccountDomain).subscribe(
        (user) => {
          this.creating.next(false);
          this.created.next(true);
          // const firebaseUser: Partial<User> = this.firebaseUser(googleUser);
          // this.data.user = firebaseUser;
          // console.log(`The Domain User is ${JSON.stringify(user)}`);
          // const firebaseUser: Partial<User> = this.firebaseUser(user);
          this.data.user = tryUser;
          this.dialogRef.close(this.data);
        },
        (err) => {
          this.creating.next(false);
          this.created.next(false);
          console.log(err.error.result.error);
          this.googleError = err.error.result.error;
        }
      );
    }
  }


  close() {
    this.dialogRef.close();
  }

  wasModify() {
    this.data.modified = true;
  }
}
