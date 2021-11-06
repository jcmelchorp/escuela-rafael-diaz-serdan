import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ROUTER_NAVIGATION, RouterNavigatedAction } from '@ngrx/router-store';
import { User } from '@rds-auth/models/user.model';
import { AccountsEntityService } from '@rds-root/app/store/accounts/accounts-entity.service';
import { filter, map, withLatestFrom } from 'rxjs/operators';

@Injectable()
export class AccountsEffects {
  constructor(
    private actions$: Actions,
    private accountsEntityService: AccountsEntityService
  ) { }

  getSingleUser$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ROUTER_NAVIGATION),
        filter((r: RouterNavigatedAction) =>
          r.payload.routerState.url.startsWith('/escuela/cuentas/edit')
        ),
        map((r: RouterNavigatedAction) => r.payload.routerState.root.params.id),
        //withLatestFrom<string, IUser[]>(this.userEntityService.entities$),
        map(([id, users]) => {
          if (!users) {
            return this.accountsEntityService.getByKey(id);
          }
          return users.find((u: any) => u.id == id);
        })
      ),
    { dispatch: false }
  );
  getUsers$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ROUTER_NAVIGATION),
        filter((r: RouterNavigatedAction) =>
          r.payload.routerState.url.startsWith('/escuela/cuentas')
        ),
        map((r: RouterNavigatedAction) => r.payload.routerState.url),
        withLatestFrom<string, User[]>(this.accountsEntityService.entities$),
        map((users) => {
          if (!users) {
            return this.accountsEntityService.getAll();
          }
          return users;
        })
      ),
    { dispatch: false }
  );
}
