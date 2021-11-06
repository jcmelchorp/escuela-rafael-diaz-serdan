import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';

import { AccountsEntityService } from '@rds-root/app/store/accounts/accounts-entity.service';

import { Observable } from 'rxjs';
import { filter, first, map, takeUntil, tap } from 'rxjs/operators';

@Injectable()
export class SchoolUsersResolver implements Resolve<boolean> {
  constructor(private accountsEntityService: AccountsEntityService) { }
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.accountsEntityService.loaded$.pipe(
      tap((loaded) => {
        if (!loaded) {
          this.accountsEntityService.getAll();
        }
      }),
      filter((loaded) => !!loaded),
      first()
    );
  }
}
