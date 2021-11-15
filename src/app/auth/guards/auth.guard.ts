import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';

import { select, Store } from '@ngrx/store';
import { isOnline } from '@rds-auth/state/auth.selectors';
import { AppState } from '@rds-store/app.state';


import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private store: Store<AppState>,
    private router: Router
  ) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    return this.store
      .pipe(
        select(isOnline),
        tap(isOnline => {
          if (!isOnline) {
            this.router.navigateByUrl('/');
          }
        })
      )
  }

}
