import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { AccountsDomainEntityService } from '@rds-store/accounts-domain/accounts-domain-entity.service';


import { Observable } from 'rxjs';
import { filter, first, map, tap } from 'rxjs/operators';

@Injectable()
export class AccountsDomainResolver implements Resolve<boolean> {

  constructor(private accountsDomainEntityService: AccountsDomainEntityService) { }
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.accountsDomainEntityService.loaded$
      .pipe(
        tap(loaded => {
          if (!loaded) {
            this.accountsDomainEntityService.getAll();
          }
        }),
        filter(loaded => !!loaded),
        first()
      );
  }
}
