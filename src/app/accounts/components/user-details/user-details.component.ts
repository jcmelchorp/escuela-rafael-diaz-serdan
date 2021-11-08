import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';

import {
  faTrashAlt,
  faPlus,
  faChevronLeft,
} from '@fortawesome/free-solid-svg-icons';

import { Store } from '@ngrx/store';
import { User } from '@rds-auth/models/user.model';
import { AppState } from '@rds-store/app.state';
import { AccountsEntityService } from '@rds-store/accounts/accounts-entity.service';


import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


import states from './states.json';
import { selectedAccountById } from '../../state/accounts.selectors';
import { PhoneType } from '@rds-auth/models/user-parent.model';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent implements OnInit {
  user$!: Observable<User | undefined>;
  loaded$!: Observable<boolean>;
  loading$!: Observable<boolean>;
  phoneKeys: string[];
  phoneEnum = PhoneType;
  statesNames: string[];
  municipiosNames!: string[] | undefined;
  userForm!: FormGroup;
  parentForm!: FormGroup;
  showParentForm = false;
  raisedElev: number = 12;
  faTrashAlt = faTrashAlt;
  faPlus = faPlus;
  faChevronLeft = faChevronLeft;
  userId!: string;
  constructor(
    private store: Store<AppState>,
    private accountsEntityService: AccountsEntityService,
    private fb: FormBuilder
  ) {
    this.statesNames = Object.keys(states);
    this.phoneKeys = Object.keys(this.phoneEnum).filter(Number);
  }

  ngOnInit() {
    this.user$ = this.store.select(selectedAccountById).pipe(
      map((user) => {
        if (user) {
          user.role == 'alumnos'
            ? this.fillStudentForm(user)
            : this.fillUserForm(user);
        }
        return user;
      })
    );
    /* this.user$ = this.accountsEntityService.entities$.pipe(
      map(users => {
        const user = users.find(u => u.id == this.userId);
        user.role == 'alumnos' ? this.fillStudentForm(user) : this.fillUserForm(user);
        return user
      })
    ); */
  }
  fillStudentForm(user?: Partial<User>) {
    this.userForm = this.fb.group({
      curp: new FormControl(user?.curp),
      niev: new FormControl(user?.niev),
      dob: new FormControl(new Date(user?.dob!)),
      gender: new FormControl(user?.gender),
      parents: this.fb.array(
        user?.parents
          ? user?.parents.map((parent) => this.setParent(parent))
          : []
      ),
    });
  }
  fillUserForm(user?: Partial<User>) {
    this.userForm = this.fb.group({
      curp: new FormControl(user?.curp),
      rfc: new FormControl(user?.rfc),
      dob: new FormControl(new Date(user?.dob!)),
      gender: new FormControl(user?.gender),
    });
  }

  onSubmit() {
    // get only updated values
    let postUser: any = {
      id: this.userId,
    };
    Object.keys(this.userForm.controls).forEach((name: string) => {
      if (this.userForm.controls[name].dirty) {
        postUser[name] = this.userForm.controls[name].value;
      }
      if (name == 'role')
        postUser[name] = this.userForm.controls[name].value.toLowerCase();
    });

    console.log(postUser);
    this.accountsEntityService.update(postUser);
  }
  onEstadoChange(estado: string) {
    this.municipiosNames = Object.values(states).find((state) =>
      state.includes(estado)
    );
  }

  get parents(): FormArray {
    return this.userForm.get('parents') as FormArray;
  }
  newParent(): FormGroup {
    return this.fb.group({
      userId: '',
      givenName: '',
      familyName: '',
      curp: '',
      gender: '',
      relationType: '',
      relationCustom: '',
      phones: [],
      email: '',
      streetAddress: '',
      neighborhood: '',
      city: '',
      postalCode: '',
      municipio: '',
      state: '',
    });
  }
  setParent(parent: any): FormGroup {
    return this.fb.group({
      userId: '',
      givenName: [parent.givenName],
      familyName: [parent.familyName],
      curp: [parent.curp],
      gender: [parent.gender],
      relationType: [parent.relationType],
      relationCustom: [parent.relationCustom],
      phones: [],
      email: [parent.email],
      streetAddress: [parent.streetAddress],
      neighborhood: [parent.neighborhood],
      city: [parent.city],
      postalCode: [parent.postalCode],
      municipio: [parent.municipio],
      state: [parent.state],
    });
  }
  addParent() {
    this.parents.push(this.newParent());
  }
  removeParent(j: number) {
    this.parents.removeAt(j);
  }
  get phones(): FormArray {
    return this.parents.get('phones') as FormArray;
  }
  newPhone(): FormGroup {
    return this.fb.group({
      value: '',
      type: '',
      primary: '',
      customType: '',
    });
  }
  addPhone() {
    this.phones.push(this.newPhone());
  }
  removePhone(i: number) {
    this.phones.removeAt(i);
  }
}
