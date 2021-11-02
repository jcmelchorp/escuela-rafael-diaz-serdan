import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';

import { GuardianEntityService } from '@rds-store/classroom/guardian/guardian-entity.service';

import { Observable, of } from 'rxjs';
import { filter, first, tap } from 'rxjs/operators';


@Injectable()
export class GuardiansResolver implements Resolve<boolean> {

  constructor(
    private guardianEntityService: GuardianEntityService,
  ) { }
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.guardianEntityService.loading$
      .pipe(
        tap(loading => {
          if (!loading) {
            this.guardianEntityService.getWithQuery(route.paramMap.get('userId'));
          }
        }),
        filter(loading => !!loading),
        first()
      );

  }
}
