import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { User } from '@rds-auth/models/user.model';
import { signOut } from '@rds-auth/state/auth.actions';
import { isAdmin, isOnline, isTeacher, selectUser } from '@rds-auth/state/auth.selectors';
import { SubscriptionService } from '@rds-shared/services';
import { AppState } from '@rds-store/app.state';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user$: Observable<User>;
  userSub: Subscription;
  constructor(
    private store: Store<AppState>,
    private subService: SubscriptionService,
  ) {
    this.user$ = this.store.pipe(select(selectUser));
  }
  ngOnInit(): void { }

  ngOnDestroy() {
    this.subService.unsubscribeComponent$;
  }

}
