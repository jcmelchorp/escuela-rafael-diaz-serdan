import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Store, select } from '@ngrx/store';
import { isTeacher } from '@rds-auth/state/auth.selectors';
import { AppState } from '@rds-store/app.state';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TeachersGuard implements CanActivate {
  constructor(private store: Store<AppState>, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.store.pipe(
      select(isTeacher),
      tap((isTeacher) => {
        if (!isTeacher) {
          this.router.navigateByUrl('/');
        }
      })
    );
  }
}
