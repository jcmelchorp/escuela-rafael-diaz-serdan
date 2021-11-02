import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { User } from '@rds-auth/models/user.model';
import { of, Observable, defer, from } from 'rxjs';
import { switchMap, map, catchError, take, tap } from 'rxjs/operators';

//import * as authAction from './auth.actions';
import * as fromAuthActions from './auth.actions';

import { Action } from '@ngrx/store';
import { AuthService } from '@rds-auth/services';
import { GapiService } from '../services/gapi.service';
@Injectable()
export class AuthEffects {
  /*  constructor(
     private actions$: Actions,
     private accountService: AuthService,
     private gapiService: GapiService
   ) { } */
  /* ngrxOnInitEffects(): Action {
    return { type: authAction.getUser().type };
  } */
  /*  init$: Observable<any> = defer(() => {
    return of(authAction.getUser());
  }); */
  /*  getUser$ = createEffect(() =>
     this.actions$.pipe(
       ofType(authAction.getUser),
       switchMap(() =>
         this.gapiService.accountsService.getAuthUser().pipe(
           map((user) => {
             if (user) {
               return authAction.signInSuccess({ user });
             } else {
               return authAction.signInFail();
             }
           }),
           catchError((error) => of(authAction.notAuthenticated({ error })))
         )
       )
     )
   );

   signIn$ = createEffect(() =>
     this.actions$.pipe(
       ofType(authAction.signIn),
       switchMap(() =>
         this.gapiService.handleSignInClick().pipe(
           switchMap((user) => {
             if (user.isNew) {
               return [
                 authAction.signInSuccess({ user }),
                 authAction.saveUser({ user }),
               ];
             } else {
               return [authAction.signInSuccess({ user })];
             }
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
         tap((action) => this.accountService.saveUser(action.user))
       ),
     { dispatch: false }
   );

   checkAdminRole$ = createEffect(() =>
     this.actions$.pipe(
       ofType(authAction.checkAdminRole),
       switchMap((action) =>
         this.accountService
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
         this.accountService
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
         this.gapiService.signOut(action.id).pipe(
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
           this.accountService.updateOnlineStatus(action.id, action.isOnline)
         )
       ),
     { dispatch: false }
   ); */
  signIn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromAuthActions.signIn),
      switchMap(() =>
        this.authService
          .signInWithPopup() /*  this.authService.handleSignInClick() */
          .pipe(
            map((res) => {
              return {
                id: res.user.providerData[0].uid,
                primaryEmail: res.user.email,
                photoUrl: res.user.providerData[0].photoURL,
                authPhotoUrl: res.user.photoURL,
                displayName: res.user.displayName,
                isNew: res.additionalUserInfo.isNewUser,
                isVerified: res.user.emailVerified,
                creationTime: res.user.metadata.creationTime,
                lastLoginTime: res.user.metadata.lastSignInTime,
                uid: res.user.uid,
              };
            }),
            switchMap((user: User) => {
              if (user.isNew) {
                return [
                  fromAuthActions.signInSuccess({ user }),
                  fromAuthActions.saveUser({ user }),
                ];
              } else {
                return [fromAuthActions.signInSuccess({ user })/* , fromAuthActions.saveUser({ user }) */];
              }
            }),
            catchError((err) => of(fromAuthActions.notAuthenticated({ error: err })))
          )
      )
    )
  );

  signInSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromAuthActions.signInSuccess),
      switchMap((action) => {
        return [
          fromAuthActions.updateOnlineStatus({
            id: action.user.id,
            isOnline: true,
          }),
          fromAuthActions.checkAdminRole({ id: action.user.id }),
          fromAuthActions.checkTeacherRole({ id: action.user.id }),
        ];
      })
    )
  );

  signOut$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromAuthActions.signOut),
        switchMap((action) =>
          from(this.authService.signOut(action.id)).pipe(
            switchMap((res) => {
              return [
                fromAuthActions.updateOnlineStatus({
                  id: action.id,
                  isOnline: false,
                }),
                fromAuthActions.signOutCompleted(),
              ];
            }),
            catchError((err) => of(fromAuthActions.notAuthenticated({ error: err })))
          )
        )
      )
    //{ dispatch: false }
  );

  getUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromAuthActions.getUser),
      switchMap(() =>
        this.authService.getAuthState().pipe(
          take(1),
          map((authData: any) => {
            if (authData) {
              const user = {
                id: authData.user.providerData[0].uid,
                name: authData.user.displayName,
                primaryEmail: authData.user.email,
                photoUrl: authData.user.photoURL,
                authPhotoUrl: authData.authPhotoUrl,
                isTeacher: authData.isTeacher,
                isAdmin: authData.isAdmin,
                isNew: authData.isNewUser,
                isVerified: authData.user.emailVerified,
                creationTime: authData.user.metadata.creationTime,
                lastLogin: authData.user.metadata.lastSignInTime,
                uid: authData.user.uid,
              };
              return fromAuthActions.signInSuccess({ user });
            } else {
              return fromAuthActions.signInFail();
            }
          }),
          catchError((error) => of(fromAuthActions.notAuthenticated({ error })))
        )
      )
    )
  );

  init$: Observable<any> = defer(() => {
    return of(fromAuthActions.getUser());
  });

  saveUser$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromAuthActions.saveUser),
        tap(action =>
          this.authService.createUser(action.user)
        )
      ),
    { dispatch: false }
  );



  checkAdminRole$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromAuthActions.checkAdminRole),
        switchMap((action) =>
          this.authService.checkAdminRole(action.id)
            .pipe(
              map((isAdmin: boolean) => fromAuthActions.updateAdminRole({ isAdmin }))
            )
        )
      ),
  );

  checkTeacherRole$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromAuthActions.checkTeacherRole),
        switchMap((action) =>
          this.authService.checkTeacherRole(action.id)
            .pipe(
              map((isTeacher: boolean) => fromAuthActions.updateTeachersRole({ isTeacher }))
            )
        )
      )
  );
  /*  fullfillUser$ = createEffect(
     () =>
       this.actions$.pipe(
         ofType(fromAuthActions.signInSuccess),
         switchMap((action) =>
           this.authService.getUserById(action.user.id)
             .pipe(
               take(1),
               map((user: User) => fromAuthActions.fullfillUserSuccess({ user }))
             )
         )
       )
   ); */

  /*  updateProfile$ = createEffect(
     () =>
       this.actions$.pipe(
         ofType(fromAuthActions.updateProfile),
         switchMap((action) =>
           this.authService.updateUser(action.userData)
             .pipe(
               map(() => {
                 const currentUser: any = this.authService.getAuthState();
                 const updatedUser: User = {
                   id: currentUser.id,
                   uid: currentUser.uid,
                   name: currentUser.name,
                   email: currentUser.email,
                   photoUrl: currentUser.photoURL,
                   isTeacher: currentUser.isTeacher,
                   isAdmin: currentUser.isAdmin,
                   isOnline: currentUser.isOnline,
                   isNew: currentUser.isNew,
                 };
                 return fromAuthActions.updateProfileSuccess({ user: updatedUser });
               }),
               catchError((err) => of(fromAuthActions.authError({ error: err })))
             )
         )
       ),
   );
  */
  updateOnlineStatus$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromAuthActions.updateOnlineStatus),
        switchMap((action) =>
          this.authService.updateOnlineStatus(action.id, action.isOnline)
        )
      ),
    { dispatch: false }
  );
  constructor(
    private actions$: Actions,
    private authService: AuthService,
  ) { }
}
