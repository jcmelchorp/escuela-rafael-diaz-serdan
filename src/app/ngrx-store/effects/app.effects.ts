import { Injectable } from '@angular/core';

import {
  Actions,
  createEffect,
  ofType,
  ROOT_EFFECTS_INIT,
} from '@ngrx/effects';
import { GapiService } from '@rds-auth/services';
import { loadApp, loadAppFail, loadAppSuccess } from '@rds-store/actions/app.actions';

import { from, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

@Injectable()
export class AppEffects {
  loadApp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadApp/* ROOT_EFFECTS_INIT */),
      switchMap(() =>
        of(this.gapiService.handleClientLoad()).pipe(
          switchMap(() => of(loadAppSuccess()))
        )
      ),
      catchError((err) => of(loadAppFail(err)))
    )
  );
  constructor(private actions$: Actions, private gapiService: GapiService) { }
}
