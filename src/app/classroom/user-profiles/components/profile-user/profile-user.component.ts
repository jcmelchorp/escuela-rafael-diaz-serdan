import { Component, OnInit, ChangeDetectionStrategy, EventEmitter, Input, Output } from '@angular/core';

import { faCheck, faTimes, faAward, faUserEdit } from '@fortawesome/free-solid-svg-icons';

import { QueryParams } from '@ngrx/data';
import { select, Store } from '@ngrx/store';

import * as fromAuthSelectors from '@rds-auth/state/auth.selectors';
import { User } from '@rds-auth/models/user.model';

import { AppState } from '@rds-store/app.state';

import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-profile-user',
  templateUrl: './profile-user.component.html',
  styleUrls: ['./profile-user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileUserComponent implements OnInit {
  @Input() user: User;
  @Output() logout = new EventEmitter<any>();
  @Output() edit = new EventEmitter<any>();
  teacherSub: Subscription;
  faCheck = faCheck;
  faTimes = faTimes;
  faAward = faAward;
  faUserEdit = faUserEdit;
  queryParams: QueryParams;
  constructor(
  ) { }

  ngOnInit(): void {
    this.queryParams = {
      studentId: this.user.id
    }
  }
  onEdit() {
    this.edit.emit(this.user);
  }
  onLogout(): void {
    this.logout.emit(this.user);
  }

}

