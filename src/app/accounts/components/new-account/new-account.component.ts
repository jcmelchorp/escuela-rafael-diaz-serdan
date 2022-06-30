import { Component, Inject, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { faTimes } from '@fortawesome/free-solid-svg-icons';
//import { AccountsDomain, UserInsert } from '@rds-admin/models/users-domain.model';
import { AccountsDomainEntityService } from '@rds-store/accounts-domain/accounts-domain-entity.service';
import { CourseLevel, SchoolLevel } from '@rds-auth/models/user.enum';
import { User } from '@rds-auth/models/user.model';
import { AccountsEntityService } from '@rds-store/accounts/accounts-entity.service';



import { BehaviorSubject, Observable } from 'rxjs';
import { UserInsert, AccountDomain } from '../../models/account-domain.model';

@Component({
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.scss'],
})
export class NewAccountComponent implements OnInit {
  firstFormGroup!: UntypedFormGroup;
  secondFormGroup!: UntypedFormGroup;
  faTimes = faTimes;
  hide: boolean = true;
  googleError: any;
  firebaseError: any;
  googleError$!: Observable<any>;
  creating: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  created: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  creating$: Observable<boolean> = this.creating.asObservable();
  created$: Observable<boolean> = this.created.asObservable();
  clevelKeys: string[];
  clevels: any = CourseLevel;
  slevelKeys: string[];
  slevels: any = SchoolLevel;
  constructor(
    private dialogRef: MatDialogRef<NewAccountComponent>,
    private accountsDomainEntityService: AccountsDomainEntityService,
    private accountsEntityService: AccountsEntityService,
    private _formBuilder: UntypedFormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.clevelKeys = Object.keys(this.clevels).filter(Number);
    this.slevelKeys = Object.keys(this.slevels).filter((x) => x.length > 5);
  }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      givenName: new UntypedFormControl('', [Validators.required]),
      familyName: new UntypedFormControl('', [Validators.required]),
      primaryEmail: new UntypedFormControl('', [
        Validators.required,
        Validators.pattern('[^ @]*@[^ @]*'),
        emailDomainValidator,
      ]),
      //primaryEmail: new FormControl('', [Validators.required, Validators.email]),
      password: new UntypedFormControl('', [Validators.required]),
    });
    this.secondFormGroup = this._formBuilder.group({
      id: new UntypedFormControl('', [Validators.required]),
      givenName: new UntypedFormControl('', [Validators.required]),
      familyName: new UntypedFormControl('', [Validators.required]),
      primaryEmail: new UntypedFormControl('', [
        Validators.required,
        Validators.email,
      ]),
      password: new UntypedFormControl('', [Validators.required]),
      gender: new UntypedFormControl(''),
      dob: new UntypedFormControl(''),
      role: new UntypedFormControl('', Validators.required),
      grade: new UntypedFormControl(''),
      level: new UntypedFormControl(''),
      isInGoogle: new UntypedFormControl(false),
      isHuman: new UntypedFormControl(false),
      isAdmin: new UntypedFormControl(false),
      isTeacher: new UntypedFormControl(false),
      suspended: new UntypedFormControl(false),
      curp: new UntypedFormControl(''),
      niev: new UntypedFormControl(''),
      rfc: new UntypedFormControl(''),
    });
  }
  close() {
    this.dialogRef.close();
  }
  onGoogleCreate() {
    this.creating.next(true);
    this.created.next(false);
    //this.adminService.handleAdminLoad()
    const tryUser: UserInsert = {
      name: {
        givenName: this.firstFormGroup.get('givenName')?.value,
        familyName: this.firstFormGroup.get('familyName')?.value,
      },
      primaryEmail: this.firstFormGroup.get('primaryEmail')?.value,
      password: this.firstFormGroup.get('password')?.value,
    };

    this.accountsDomainEntityService.add(tryUser as AccountDomain).subscribe(
      (user) => {
        this.creating.next(false);
        this.created.next(true);
        this.secondFormGroup.patchValue({
          id: user.id,
          givenName: user.name?.givenName,
          familyName: user.name?.familyName,
          primaryEmail: user.primaryEmail,
          password: this.firstFormGroup.get('password')?.value,
          gender: '',
          dob: '',
          role: '',
          grade: '',
          level: '',
          isInGoogle: true,
          isHuman: false,
          isAdmin: user.isAdmin,
          isTeacher: false,
          suspended: false,
          curp: '',
          niev: '',
          rfc: '',
        });
        console.log(`The Domain User is ${JSON.stringify(user)}`);
        this.data.googleUser = user;
        this.accountsEntityService.add({ ...this.data.googleUser, id: user.id } as User);
      },
      (err) => {
        this.creating.next(false);
        this.created.next(false);
        console.log(err.error.result.error);
        this.googleError = err.error.result.error;
      }
    );
  }
  onFirebaseCreate() {
    this.creating.next(true);
    const postUser = this.firebaseUser(this.data.googleUser);
    this.accountsEntityService.update({ ...postUser, id: this.data.googleUser.id }).subscribe(
      (user) => {
        this.creating.next(false);
        this.created.next(true);
        this.data.firebaseUser = user;
        console.log(this.data);
        this.dialogRef.close(this.data);
      },
      (err) => {
        this.creating.next(false);
        this.created.next(false);
        this.firebaseError = err.error.result;
        this.dialogRef.close();
      }
    );
  }
  firebaseUser(googleUser: Partial<AccountDomain>) {
    const dayOfBirth = this.secondFormGroup.get('dob')?.value;
    const dob = dayOfBirth
      ? this.secondFormGroup.get('dob')?.value.toLocaleDateString()
      : '';
    const firebaseUser: Partial<User> = {
      id: googleUser.id ? googleUser.id : '',
      primaryEmail: googleUser.primaryEmail,
      isAdmin: this.secondFormGroup.get('isAdmin')?.value,
      isTeacher: this.secondFormGroup.get('role')?.value == 'profesores',
      isHuman: this.secondFormGroup.get('isHuman')?.value,
      orgUnitPath: googleUser.orgUnitPath,
      password: this.secondFormGroup.get('password')?.value,
      role: this.secondFormGroup.get('role')?.value,
      level: this.secondFormGroup.get('level')?.value,
      grade: this.secondFormGroup.get('grade')?.value,
      archived: false,
      gender: this.secondFormGroup.get('gender')?.value,
      name: {
        givenName: googleUser.name?.givenName,
        familyName: googleUser.name?.familyName,
        fullName: [
          this.secondFormGroup.get('givenName')?.value,
          this.secondFormGroup.get('familyName')?.value,
        ].join(' '),
      },
      customerId: googleUser.customerId,
      suspended: false,
      suspensionReason: '',
      curp: '',
      dob: dob,
      isNew: true,
      isOnline: false,
      isVerified: false,
      authPhotoUrl: '//lh3.googleusercontent.com/a/default-user',
      photoUrl: '//lh3.googleusercontent.com/a/default-user',
      displayName: [
        this.secondFormGroup.get('givenName')?.value,
        this.secondFormGroup.get('familyName')?.value,
      ].join(' '),
      creationTime: googleUser.creationTime,
      lastLoginTime: '',

      permission: '',
    };
    if (firebaseUser.role == 'Alumnos') {
      firebaseUser.niev = '';
      firebaseUser.parents = [
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
    } else {
      firebaseUser.rfc = '';
    }
    return firebaseUser;
  }
}
function emailDomainValidator(control: UntypedFormControl) {
  1;
  let email = control.value;
  2;
  if (email && email.indexOf('@') != -1) {
    3;
    let [_, domain] = email.split('@');
    4;
    if (domain !== 'rafaeldiazserdan.net') {
      5;
      return {
        emailDomain: {
          parsedDomain: domain,
        },
      };
    }
  }
  return null;
  6;
}
