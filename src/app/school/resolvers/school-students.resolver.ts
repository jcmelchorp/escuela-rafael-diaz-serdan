import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';

import { Observable } from 'rxjs';
import { filter, first, map, tap } from 'rxjs/operators';
import { AccountsEntityService } from '@rds-store/accounts/accounts-entity.service';

@Injectable()
export class SchoolStudentsResolver implements Resolve<boolean> {
  constructor(private accountsEntityService: AccountsEntityService) { }
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.accountsEntityService.loading$.pipe(
      tap((loading) => {
        if (!loading) {
          this.accountsEntityService.getWithQuery({ role: 'Alumnos' });
        }
      }),
      filter((loading) => !!loading),
      first()
    );
  }
}
