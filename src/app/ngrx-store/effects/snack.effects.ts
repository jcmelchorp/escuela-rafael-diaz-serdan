import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as fromAuthActions from '@rds-auth/state/auth.actions';

import { ToastrService } from 'ngx-toastr';

import { tap } from 'rxjs/operators';

import { SnackService } from '@rds-shared/services';
import { loadAppSuccess } from '@rds-store/actions/app.actions';

@Injectable()
export class SnackEffects {
  welcomeBack$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromAuthActions.signInSuccess),
        tap((user) =>
          this.toastrService.success(
            `Has ingresado como: ${user.user?.displayName}`
          )
        )
      ),
    { dispatch: false }
  );

  welcome$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loadAppSuccess),
        tap(() =>
          setTimeout(() => {
            this.snackService.justMessage('La aplicación está lista');
          }, 2000)
        )
      ),
    { dispatch: false }
  );

  unableToLogin$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromAuthActions.notAuthenticated),
        tap((error) => {
          this.toastrService.warning(error.error.message, error.error.code);
        })
      ),
    { dispatch: false }
  );

  youAreLoggedOut$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromAuthActions.signOut),
        tap(() =>
          this.toastrService.success(
            'Finazlizando sesión',
            'Registro de acceso'
          )
        )
      ),
    { dispatch: false }
  );

  comeBackSoon$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromAuthActions.signOutCompleted),
        tap(() =>
          setTimeout(() => {
            this.toastrService.success(
              'Tu sesión ha terminado. Vuelve pronto!',
              'Registro de acceso'
            );
          }, 2000)
        )
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private toastrService: ToastrService,
    private snackService: SnackService
  ) { }
}
