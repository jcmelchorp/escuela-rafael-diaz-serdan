import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { UserProfileEntityService } from '@rds-store/classroom/user-profile/user-profile-entity.service';
import { Observable, of } from 'rxjs';
import { filter, first, map, tap } from 'rxjs/operators';

@Injectable()
export class UserProfileResolver implements Resolve<boolean> {
  constructor(private userProfileES: UserProfileEntityService) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.userProfileES.loading$.pipe(
      tap((loading) => {
        if (!loading) {
          this.userProfileES.getByKey(route.queryParamMap.get('id'));
        }
      }),
      filter((loading) => !!loading),
      first()
    );
  }
}
