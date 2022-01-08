import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { filter, first, map, tap } from 'rxjs/operators';
import { AccountsEntityService } from '../../store/accounts/accounts-entity.service';

@Injectable()
export class SchoolTeachersResolver implements Resolve<boolean> {
  constructor(/* private schoolTeachersEntityService: SchoolTeachersEntityService */
    private accountsEntityService: AccountsEntityService) { }
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.accountsEntityService.loading$.pipe(
      tap((loading) => {
        if (!loading) {
          this.accountsEntityService.getWithQuery({ role: 'Profesores' });
          /* .pipe(
            map(users => users.filter(user => user.role === 'Profesores'))) */
        }
      }),
      filter((loading) => !!loading),
      first()
    );
  }
}
