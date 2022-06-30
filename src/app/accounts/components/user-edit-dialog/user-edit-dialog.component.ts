import { AccountDomain } from './../../models/account-domain.model';
import { UntypedFormBuilder, UntypedFormControl, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UntypedFormGroup } from '@angular/forms';

import { faTimes, faUserPlus } from '@fortawesome/free-solid-svg-icons';

import { ToastrService } from 'ngx-toastr';

import { Observable } from 'rxjs';

import states from './states.json';
import { CourseLevel, SchoolLevel } from '@rds-auth/models/user.enum';
import { User } from '@rds-auth/models/user.model';
import { UserRole } from '../../../auth/models/user.enum';

@Component({
  templateUrl: './user-edit-dialog.component.html',
  styleUrls: ['./user-edit-dialog.component.scss'],
})
export class UserEditDialogComponent {
  faTimes = faTimes;
  faUserPlus = faUserPlus;
  hide: boolean = true;
  saveForm!: UntypedFormGroup;
  roles = UserRole;
  rolekeys: string[];
  newUser!: Observable<AccountDomain>;
  clevelKeys: string[];
  clevels: any = CourseLevel;
  slevelKeys: string[];
  slevels: any = SchoolLevel;
  constructor(
    private dialogRef: MatDialogRef<UserEditDialogComponent>,
    private fb: UntypedFormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.rolekeys = Object.keys(UserRole);
    this.clevelKeys = Object.keys(CourseLevel);
    this.slevelKeys = Object.keys(SchoolLevel);
    this.initForm();
  }

  initForm() {
    this.saveForm = this.fb.group({
      givenName: new UntypedFormControl(this.data.user.name.givenName, [
        Validators.required,
      ]),
      familyName: new UntypedFormControl(this.data.user.name.familyName, [
        Validators.required,
      ]),
      primaryEmail: new UntypedFormControl(this.data.user.primaryEmail, [
        Validators.required,
        Validators.email,
      ]),
      password: new UntypedFormControl(this.data.user.password),
      /*  dob: new FormControl(new Date(this.data.user.dob)), */
      role: new UntypedFormControl(this.data.user.role),
      grade: new UntypedFormControl(this.data.user.grade),
      level: new UntypedFormControl(this.data.user.level),
      isInGoogle: new UntypedFormControl(this.data.isInGoogle),
      isHuman: new UntypedFormControl(this.data.user.isHuman),
      isAdmin: new UntypedFormControl(this.data.user.isAdmin),
      isTeacher: new UntypedFormControl(this.data.user.isTeacher),
      suspended: new UntypedFormControl(this.data.user.suspended),
      /*  curp: new FormControl(this.data.user.curp),
       niev: new FormControl({ value: this.data.user.niev, disabled: this.data.user.isAdmin }),
       rfc: new FormControl(this.data.user.rfc), */
    });
  }
  onSubmit() {
    if (this.data.isNew == true) {
      if (!this.saveForm.get('isInGoogle')?.value) {
        let googleUser: Partial<AccountDomain> = {
          password: this.saveForm.get('password')?.value,
          primaryEmail: this.saveForm.get('primaryEmail')?.value,
          name: {
            givenName: this.saveForm.get('givenName')?.value,
            familyName: this.saveForm.get('familyName')?.value,
            fullName: [
              this.saveForm.get('givenName')?.value,
              this.saveForm.get('familyName')?.value,
            ].join(' '),
          },
          changePasswordAtNextLogin: false,
          orgUnitPath: ['/Dirección', this.saveForm.get('role')?.value].join('/'),
        };
        if (
          this.saveForm.get('role')?.value == 'Alumnos' &&
          this.saveForm.get('level')?.value != null &&
          this.saveForm.get('grade')?.value != null
        ) {
          googleUser.orgUnitPath = [
            ...googleUser.orgUnitPath,
            this.saveForm.get('level')?.value,
            this.saveForm.get('grade')?.value,
          ].join('/');
        }
        const firebaseUser: Partial<User> = this.firebaseUser(googleUser);
        this.data.user = firebaseUser;
        this.dialogRef.close(this.data);
      }
    } else if (this.data.isNew == false) {
      if (this.saveForm.get('isInGoogle')?.value) {
        var firebaseUser: any = { id: this.data.user.id };
        Object.keys(this.saveForm.controls).forEach((name: string) => {
          if (this.saveForm.controls[name].dirty) {
            if (name != 'familyName' && name != 'givenName') {
              firebaseUser[name] = this.saveForm.controls[name].value;
            } else {
              if (name == 'familyName')
                firebaseUser.name
                  ? (firebaseUser.name[name] =
                    this.saveForm.controls[name].value.toUpperCase())
                  : (firebaseUser.name = {});
              if (name == 'givenName')
                firebaseUser.name
                  ? ([name] = this.saveForm.controls[name].value.toUpperCase())
                  : (firebaseUser.name = {});
            }

            if (name == 'role')
              firebaseUser[name] =
                this.saveForm.controls[name].value;
          }
        });
        if (
          this.saveForm.get('role')?.value == 'Alumnos' &&
          this.saveForm.get('level')?.value != null &&
          this.saveForm.get('grade')?.value != null
        ) {
          firebaseUser.orgUnitPath = [
            firebaseUser.orgUnitPath,
            this.saveForm.get('level')?.value,
            this.saveForm.get('grade')?.value,
          ].join('/');
        }
        this.data.user = firebaseUser;
        this.dialogRef.close(this.data);
      } else if (!this.saveForm.get('isInGoogle')?.value) {
        alert('Esta opcion no esta lista aún');
      }
    }
  }

  firebaseUser(googleUser: AccountDomain) {
    const firebaseUser: User = {
      id: googleUser.id ? googleUser.id : ' ',
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
        familyName: googleUser.name?.familyName,
        fullName: [
          this.saveForm.get('givenName')?.value,
          this.saveForm.get('familyName')?.value,
        ].join(' '),
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
