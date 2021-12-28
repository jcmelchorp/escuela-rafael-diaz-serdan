import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faAward, faSignOutAlt, faUserCheck, faUserEdit, faUserTimes } from '@fortawesome/free-solid-svg-icons';
import { select, Store } from '@ngrx/store';
import { UserRole } from '@rds-auth/models/user.enum';
import { User } from '@rds-auth/models/user.model';
import { signOut } from '@rds-auth/state/auth.actions';
import { isAdmin, isOnline, isTeacher, selectUser } from '@rds-auth/state/auth.selectors';
import { SubscriptionService } from '@rds-shared/services';
import { AppState } from '@rds-store/app.state';
import { Observable, Subscription } from 'rxjs';
import { map, mergeMap, tap } from 'rxjs/operators';
import { AccountsEntityService } from '../../../store/accounts/accounts-entity.service';

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
  ) {

  }

  ngOnInit(): void {
    this.user$ = this.store.select(selectUser)
      .pipe(
        mergeMap(user => this.accountsEntityService.getByKey(user.id)
          .pipe(
            map(account => {
              if (account.dob.toString().includes('/')) {
                const arr = account.dob.split('/')
                this.dayOfBirth = new Date(+arr[2], +arr[1] - 1, +arr[0]);
              } else {
                this.dayOfBirth = new Date(account.dob)
              }
              return account;
            })
          )),
        tap(user => console.log(user))
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
