import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  OnDestroy,
} from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

import { select, Store } from '@ngrx/store';

import { User } from '@rds-auth/models/user.model';

import { AppState } from '@rds-store/index';

import * as fromAuthActions from '@rds-auth/state/auth.actions';

import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { selectUser } from '@rds-auth/state/auth.selectors';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditProfileComponent implements OnInit, OnDestroy {
  @Input() user: User;
  user$: Observable<User>;
  userSub: Subscription;
  @Output() profileUpdate = new EventEmitter<User>();
  updateProfileForm: FormGroup;
  fullName: FormControl;
  photoUrl: FormControl;

  constructor(private fb: FormBuilder, private store: Store<AppState>) {
    this.user$ = this.store.pipe(select(selectUser));
    this.userSub = this.user$.subscribe((user) => (this.user = user));
    this.updateProfileForm = this.fb.group({
      fullName: new FormControl(this.user.name),
      photoUrl: new FormControl(this.user.photoUrl),
    });
  }

  ngOnInit(): void { }
  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
  onProfileUpdate() {
    const newUser: User = {
      photoUrl: this.updateProfileForm.get('photoUrl').value,
      id: this.user.id,
    };
    this.store.dispatch(fromAuthActions.updateProfile({ userData: newUser }));
  }
}
