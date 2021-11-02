import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { User } from '@rds-auth/models/user.model';
import { selectUser } from '@rds-auth/state/auth.selectors';
import { AppState } from '@rds-store/index';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, take } from 'rxjs/operators';
import { AuthService } from '../../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(
    private store: Store<AppState>,
    private router: Router,
    private authFireService: AuthService,
    private toastr: ToastrService,
  ) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {
    return this.store.select(selectUser)
      .pipe(
        take(1),
        switchMap((user: User) => {
          if (!user) {
            this.toastr.warning('Para acceder a esta función, inicia sesión', 'Acceso no autorizado')
            this.router.navigateByUrl('/');
            return of(false);
          }
          return this.authFireService.checkAdminRole(user.id)
            .pipe(
              map(isAdmin => {
                if (isAdmin) {
                  return true;
                } else {
                  this.toastr.error('Tu cuenta no tiene los permisos suficientes para esta función', 'Usuario sin aurtorización')
                  this.router.navigateByUrl('/');
                  return false;
                }
              }),
              catchError(() => {
                this.toastr.error('Ha ocurrido un error')
                this.router.navigateByUrl('');
                return of(false);
              })
            );
        }),
      );
  }

}
