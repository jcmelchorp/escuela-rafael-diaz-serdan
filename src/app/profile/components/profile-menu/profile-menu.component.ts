import { Component, EventEmitter, Input, OnInit, Output, OnDestroy } from '@angular/core';
import { faAward, faSignOutAlt, faUserCheck, faUserEdit, faUserTimes } from '@fortawesome/free-solid-svg-icons';
import { select, Store } from '@ngrx/store';
import { UserRole } from '@rds-auth/models/user.enum';
import { User } from '@rds-auth/models/user.model';
import { signOut } from '@rds-auth/state/auth.actions';
import { isAdmin, isOnline, isTeacher, selectUser, selectUserId } from '@rds-auth/state/auth.selectors';
import { SubscriptionService } from '@rds-shared/services';
import { AppState } from '@rds-store/app.state';
import { Observable, Subscription } from 'rxjs';
import { map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { AccountsEntityService } from '@rds-store/accounts/accounts-entity.service';
import * as _moment from 'moment';
import { Moment } from 'moment';
const moment = _moment;
@Component({
  selector: 'app-profile-menu',
  templateUrl: './profile-menu.component.html',
  styleUrls: ['./profile-menu.component.scss']
})
export class ProfileMenuComponent implements OnInit, OnDestroy {
  user$: Observable<User>;
  isOnline$: Observable<boolean>;
  loading$: Observable<boolean>;
  isAdmin$: Observable<boolean>;
  isTeacher$: Observable<boolean>;
  userSub: Subscription;
  role: UserRole;
  @Output() logout = new EventEmitter<User>();
  faAward = faAward;
  faUserEdit = faUserEdit;
  faSignOutAlt = faSignOutAlt;
  faUserCheck = faUserCheck;
  faUserTimes = faUserTimes;

  canLogout!: boolean;
  dayOfBirth: Date;
  constructor(
    private store: Store<AppState>,
    private accountsEntityService: AccountsEntityService,
    private subService: SubscriptionService
  ) { }
  ngOnDestroy() {
    this.subService.unsubscribeComponent$;
  }
  ngOnInit(): void {
    this.user$ = this.store.select(selectUserId)
      .pipe(
        mergeMap(userId => this.accountsEntityService.entities$.pipe(map(accounts => {
          return accounts.find(account => account.id === userId);
        }))),
        //map(user => { return { ...user, dob: moment(user?.dob, "DD/MM/YYYY").toDate().toLocaleDateString() } as User })
        //tap(user => console.log(user))
      );
    this.isOnline$ = this.store.select(isOnline);
    this.isAdmin$ = this.store.select(isAdmin);
    this.isTeacher$ = this.store.select(isTeacher);
  }
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
