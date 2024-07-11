import { AccountDomain, UserInsert } from './../../models/account-domain.model';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';

import { faTimes, faUserPlus } from '@fortawesome/free-solid-svg-icons';

import { ToastrService } from 'ngx-toastr';

import { BehaviorSubject, Observable } from 'rxjs';

import states from './states.json';
import { CourseLevel, SchoolLevel } from '@rds-auth/models/user.enum';
import { User } from '@rds-auth/models/user.model';
import { UserRole } from '../../../auth/models/user.enum';
import { AccountsDomainEntityService } from '@rds-store/accounts-domain/accounts-domain-entity.service';

@Component({
  templateUrl: './user-edit-dialog.component.html',
  styleUrls: ['./user-edit-dialog.component.scss'],
})
export class UserEditDialogComponent {
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
    private dialogRef: MatDialogRef<UserEditDialogComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.rolekeys = Object.keys(UserRole);
    this.clevelKeys = Object.keys(CourseLevel);
    this.slevelKeys = Object.keys(SchoolLevel);
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
      password: new FormControl(this.data.user.password),
      /*  dob: new FormControl(new Date(this.data.user.dob)), */
      role: new FormControl(this.data.user.role),
      grade: new FormControl(this.data.user.grade),
      level: new FormControl(this.data.user.level),
      isInGoogle: new FormControl(this.data.isInGoogle),
      isHuman: new FormControl(this.data.user.isHuman),
      isAdmin: new FormControl(this.data.user.isAdmin),
      isTeacher: new FormControl(this.data.user.isTeacher),
      suspended: new FormControl(this.data.user.suspended),
      changePasswordAtNextLogin: new FormControl(this.data.user.changePasswordAtNextLogin!),
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
            if (name != 'familyName' || 'givenName' || 'primaryEmail' || 'givenName') {
              firebaseUser[name] = this.saveForm.controls[name].value;
            }
          }
        });



        if (this.saveForm.get('givenName').dirty || this.saveForm.get('familyName').dirty || this.saveForm.get('primaryEmail').dirty || this.saveForm.get('password').dirty) {
          const tryUser: UserInsert = {
            id: this.data.user.id,
            name: {
              givenName: this.saveForm.get('givenName')?.value,
              familyName: this.saveForm.get('familyName')?.value,
            },
            primaryEmail: this.saveForm.get('primaryEmail')?.value,
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
              this.data.user = { ...firebaseUser, ...tryUser };
              console.log(this.data.user)
              this.dialogRef.close(this.data);
            },
            (err) => {
              this.creating.next(false);
              this.created.next(false);
              console.log(err.error.result.error);
              this.googleError = err.error.result.error;
            }
          );
        } else {
          this.data.user = firebaseUser;
          console.log(this.data.user)
          this.dialogRef.close(this.data);
        }
      }
    } else if (!this.saveForm.get('isInGoogle')?.value) {
      alert('Esta opcion no esta lista aún');
    }
  }


  firebaseUser(googleUser: AccountDomain) {
    const firebaseUser: User = {
      id: googleUser.id ? googleUser.id : '',
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
