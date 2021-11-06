import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { Store } from '@ngrx/store';
import { AppState } from '@rds-root/app/store/app.state';
import { AccountsEntityService } from '@rds-root/app/store/accounts/accounts-entity.service';



import { Observable, Subscription } from 'rxjs';
import { filter, first, tap } from 'rxjs/operators';

//import { selectedUserById } from '../state/user/user.selectors';


@Injectable()
export class AccountResolver implements Resolve<boolean> {
  userId!: string;
  subscript!: Subscription;
  constructor(
    private accountsEntityService: AccountsEntityService,
    private store: Store<AppState>,
  ) { }
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.accountsEntityService.loading$
      .pipe(
        tap(loaded => {
          if (!loaded) {
            this.accountsEntityService.getByKey(route.queryParams.id);
          }
        }),
        filter(loaded => !!loaded),
        first()
      );
  }
}
