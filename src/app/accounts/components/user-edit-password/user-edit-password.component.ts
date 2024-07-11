import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { faTimes, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { AccountDomain } from '@rds-accounts/models/account-domain.model';
import { UserRole, CourseLevel, SchoolLevel } from '@rds-auth/models/user.enum';
import { Observable } from 'rxjs';
import { UserEditDialogComponent } from '../user-edit-dialog/user-edit-dialog.component';
import { User } from '@rds-auth/models/user.model';

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
  constructor(
    private dialogRef: MatDialogRef<UserEditPasswordComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.initForm();
  }

  initForm() {
    this.saveForm = this.fb.group({
      password: new FormControl(this.data.user.password!),
      changePasswordAtNextLogin: new FormControl(this.data.user.changePasswordAtNextLogin!),
    });
  }
  onSubmit() {
    if (this.data.isNew == true) {
      if (!this.saveForm.get('isInGoogle')?.value) {
        let googleUser: Partial<AccountDomain> = {
          password: this.saveForm.get('password')?.value,
          changePasswordAtNextLogin: false,
        };
        // const firebaseUser: Partial<User> = this.firebaseUser(googleUser);
        // this.data.user = firebaseUser;
        this.data.user = firebaseUser;
        this.dialogRef.close(this.data);
      }
    } else if (this.data.isNew == false) {
      if (this.saveForm.get('isInGoogle')?.value) {
        var firebaseUser: any = { id: this.data.user.id };
        Object.keys(this.saveForm.controls).forEach((name: string) => {
          firebaseUser[name] =
            this.saveForm.controls[name].value;
        });
        this.data.user = firebaseUser;
        this.dialogRef.close(this.data);
      } else if (!this.saveForm.get('isInGoogle')?.value) {
        alert('Esta opcion no esta lista aún');
      }
    }
  }

  firebaseUser(googleUser: AccountDomain) {
    const firebaseUser: User = {
      id: googleUser.id,
      primaryEmail: googleUser.primaryEmail,
      isAdmin: this.saveForm.get('isAdmin')?.value,
      isTeacher: this.saveForm.get('role')?.value == 'Profesores',
      isHuman: this.saveForm.get('isHuman')?.value,
      orgUnitPath: googleUser.orgUnitPath!,
      password: this.saveForm.get('password')?.value,
      role: this.saveForm.get('role')?.value,
      level: this.saveForm.get('level')?.value,
      grade: this.saveForm.get('grade')?.value,
      archived: false,
      //gender: this.saveForm.get('gender')?.value,
      name: {
        givenName: googleUser.name?.givenName,
        familyName: googleUser.name?.familyName
      },
      customerId: googleUser.customerId!,
      suspended: this.saveForm.get('suspended')?.value,
      suspensionReason: '',
      isNew: true,
      isOnline: false,
      isVerified: false,
      authPhotoUrl: '',
      photoUrl: '',
      displayName: [
        this.saveForm.get('givenName')?.value,
        this.saveForm.get('familyName')?.value,
      ].join(' '),
      creationTime: googleUser.creationTime,
      lastLoginTime: '',
      parents: [
        {
          name: {
            fullName: '',
            givenName: '',
            familyName: '',
          },
          city: '',
          curp: '',
          email: '',
          gender: '',
        },
      ],
      permission: '',
    };
    return firebaseUser;
  }

  close() {
    this.dialogRef.close();
  }
  roleChange() {
    if (this.data.role != 'Alumnos') {
      this.data.grade = '';
      this.data.level = '';
    } else {
      this.data.parents = [
        {
          name: {
            fullName: '',
            givenName: '',
            familyName: '',
          },
          city: '',
          curp: '',
          email: '',
          gender: '',
        },
      ];
    }
    this.data.modified = true;
  }
  dobChange() {
    this.data.dob = this.data.dob.toLocaleDateString();
    this.data.modified = true;
  }
  wasModify() {
    this.data.modified = true;
  }
}
