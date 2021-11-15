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
        tap((payload) =>
          setTimeout(() => {
            this.snackService.justMessage(
              `Bienvenido, ${payload.user.name?.givenName}`);
          }, 2000)
        )
      ),
    { dispatch: false }
  );

  /*  welcome$ = createEffect(
     () =>
       this.actions$.pipe(
         ofType(loadAppSuccess),
         tap(() =>
           setTimeout(() => {
             this.snackService.justMessage('La aplicación está lista');
           }, 3000)
         )
       ),
     { dispatch: false }
   ); */

  unableToLogin$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromAuthActions.notAuthenticated),
        tap((error) =>
          setTimeout(() => {
            this.snackService.messageWithComponent('Error', {
              vPos: 'bottom',
              hPos: 'left',
              setAutoHide: false,
              hide: 5000,
              message: error.error.message,
              action: true,
              actionString: error.error.code,
              extra: false
            });
          }, 3000)
        )),
    { dispatch: false }
  );

  /* youAreLoggedOut$ = createEffect(
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
  ); */

  comeBackSoon$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromAuthActions.signOutCompleted),
        tap(() =>
          setTimeout(() => {
            this.snackService.justMessage('Tu sesión ha terminado. Vuelve pronto!');
          }, 3000)
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
