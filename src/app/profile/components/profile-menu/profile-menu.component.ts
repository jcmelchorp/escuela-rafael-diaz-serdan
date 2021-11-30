import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faAward, faSignOutAlt, faUserCheck, faUserEdit, faUserTimes } from '@fortawesome/free-solid-svg-icons';
import { select, Store } from '@ngrx/store';
import { User } from '@rds-auth/models/user.model';
import { signOut } from '@rds-auth/state/auth.actions';
import { isAdmin, isOnline, isTeacher, selectUser } from '@rds-auth/state/auth.selectors';
import { SubscriptionService } from '@rds-shared/services';
import { AppState } from '@rds-store/app.state';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-profile-menu',
  templateUrl: './profile-menu.component.html',
  styleUrls: ['./profile-menu.component.scss']
})
export class ProfileMenuComponent implements OnInit {
  user$: Observable<User>;
  isOnline$: Observable<boolean>;
  loading$: Observable<boolean>;
  isAdmin$: Observable<boolean>;
  isTeacher$: Observable<boolean>;
  userSub: Subscription;
  @Output() logout = new EventEmitter<User>();
  faAward = faAward;
  faUserEdit = faUserEdit;
  faSignOutAlt = faSignOutAlt;
  faUserCheck = faUserCheck;
  faUserTimes = faUserTimes;
  canLogout!: boolean;
  constructor(private store: Store<AppState>,
    private subService: SubscriptionService
  ) {
    this.user$ = this.store.select(selectUser);
    this.isOnline$ = this.store.select(isOnline);
    this.isAdmin$ = this.store.select(isAdmin);
    this.isTeacher$ = this.store.select(isTeacher);
  }

  ngOnInit(): void { }
  scroll(el: HTMLElement) {
    el.scrollIntoView();
  }
  onLogout(id): void {
    this.store.dispatch(signOut({ id }));
    this.canLogout = false;
  }
  cancel(): void {
    this.canLogout = false;
  }
  prepareForLogout(): void {
    this.canLogout = true;
  }
}
