import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ROUTER_NAVIGATION, RouterNavigatedAction } from '@ngrx/router-store';
import { User } from '@rds-auth/models/user.model';
import { AccountsEntityService } from '@rds-store/accounts/accounts-entity.service';
import { filter, map, tap, withLatestFrom } from 'rxjs/operators';

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
          r.payload.routerState.url.startsWith('/u/edit')
        ),
        //tap((r: RouterNavigatedAction) => console.log(r.payload.routerState)),
        map((r: RouterNavigatedAction) => r.payload.routerState['params']['id']),
        withLatestFrom(this.accountsEntityService.entities$),
        map(([id, courses]) => {
          if (!courses) {
            return this.accountsEntityService.getByKey(id)
          }
          return courses.find(u => u.id == id)
        })
      ),
    { dispatch: false }
  );
  getUsers$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ROUTER_NAVIGATION),
        filter((r: RouterNavigatedAction) =>
          r.payload.routerState.url.startsWith('/u')
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
