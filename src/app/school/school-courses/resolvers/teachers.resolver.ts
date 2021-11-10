import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, first, tap } from 'rxjs/operators';
import { selectUser } from '@rds-auth/state/auth.selectors';
import { AccountsEntityService } from '../../../store/accounts/accounts-entity.service';

@Injectable()
export class TeachersResolver implements Resolve<boolean> {
  constructor(private accountsEntityService: AccountsEntityService) { }
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.accountsEntityService.loading$.pipe(
      tap((loading) => {
        if (!loading) {
          this.accountsEntityService.getWithQuery({ role: 'profesores' });
        }
      }),
      filter((loading) => !!loading),
      first()
    );
  }
}
