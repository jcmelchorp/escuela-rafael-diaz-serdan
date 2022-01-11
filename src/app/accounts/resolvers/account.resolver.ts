import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { Store } from '@ngrx/store';
import { AppState } from '@rds-store/app.state';
import { AccountsEntityService } from '@rds-store/accounts/accounts-entity.service';



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
    return this.accountsEntityService.loaded$
      .pipe(
        tap(loaded => {
          if (!loaded) {
            console.log(route.params.id)
            this.accountsEntityService.getByKey(route.params.id);
          }
        }),
        filter(loaded => !!loaded),
        first()
      );
  }
}
