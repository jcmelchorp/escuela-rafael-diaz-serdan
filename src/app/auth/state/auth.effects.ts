import { UserCredential } from '@angular/fire/auth';
import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { User } from '@rds-auth/models/user.model';
import { of, Observable, defer, from } from 'rxjs';
import { switchMap, map, catchError, take, tap } from 'rxjs/operators';
import firebase from 'firebase/compat/app'
import * as authAction from './auth.actions';

import { Action, INIT } from '@ngrx/store';
import { AuthService } from '@rds-auth/services';
import { GapiService } from '../services/gapi.service';
@Injectable()
export class AuthEffects implements OnInitEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private gapiService: GapiService
  ) { }
  ngrxOnInitEffects(): Action {
    return { type: authAction.getUser().type };
  }
  /* init$: Observable<any> = defer(() => {
    return of(authAction.getUser());
  }); */
  getUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authAction.getUser),
      switchMap(() =>
        this.authService.getAuthUser().pipe(
          map((user) => {
            if (user) {
              return authAction.signInSuccess({ user });
            } else {
              return authAction.signInFail();
            }
          }),
        )
      ), catchError((error) => of(authAction.notAuthenticated({ error })))
    )
  );

  signIn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authAction.signIn),
      switchMap(() =>
        this.authService.signInWithPopup().pipe(
          map((res: any) => {
            return {
              id: res.user.providerData[0].uid,
              primaryEmail: res.user.email,
              photoUrl: res.user.providerData[0].photoURL,
              authPhotoUrl: res.user.photoURL,
              displayName: res.user.displayName,
              isVerified: res.user.emailVerified,
              creationTime: res.user.metadata.creationTime,
              lastLoginTime: res.user.metadata.lastSignInTime,
              uid: res.user.uid,
            };
          }),
          switchMap((user) => {
            return [
              authAction.signInSuccess({ user }),
              authAction.saveUser({ user })
            ];
          }),
          catchError((error) => of(authAction.notAuthenticated({ error })))
        )
      )
    )
  );

  signInSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authAction.signInSuccess),
      switchMap((user) => {
        return [
          authAction.updateOnlineStatus({
            id: user.user.id,
            isOnline: true,
          }),
          authAction.checkAdminRole({ id: user.user.id }),
          authAction.checkTeacherRole({ id: user.user.id }),
        ];
      })
    )
  );

  saveUser$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authAction.saveUser),
        tap((action) => this.authService.saveUser(action.user))
      ),
    { dispatch: false }
  );

  checkAdminRole$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authAction.checkAdminRole),
      switchMap((action) =>
        this.authService
          .checkAdminRole(action.id)
          .pipe(
            switchMap((isAdmin) => [authAction.updateAdminRole({ isAdmin })])
          )
      )
    )
  );

  checkTeacherRole$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authAction.checkTeacherRole),
      switchMap((action) =>
        this.authService
          .checkTeacherRole(action.id)
          .pipe(
            switchMap((isTeacher) => [
              authAction.updateTeachersRole({ isTeacher }),
            ])
          )
      )
    )
  );
  signOut$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authAction.signOut),
      switchMap((action) =>
        this.authService.signOut(action.id).pipe(
          map(() => {
            return authAction.signOutCompleted();
          }),
          catchError((err) => of(authAction.notAuthenticated({ error: err })))
        )
      )
    )
  );


  updateOnlineStatus$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authAction.updateOnlineStatus),
        switchMap((action) =>
          this.authService.updateOnlineStatus(action.id, action.isOnline)
        )
      ),
    { dispatch: false }
  );
}
