import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, first, map, tap } from 'rxjs/operators';
import { AccountsEntityService } from '../../store/accounts/accounts-entity.service';

@Injectable()
export class SchoolStudentsResolver implements Resolve<boolean> {
  constructor(private accountsEntityService: AccountsEntityService) { }
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.accountsEntityService.loaded$.pipe(
      tap((loaded) => {
        if (!loaded) {
          this.accountsEntityService.getWithQuery({ role: 'Alumnos' });
        }
      }),
      filter((loaded) => !!loaded),
      first()
    );
  }
}
