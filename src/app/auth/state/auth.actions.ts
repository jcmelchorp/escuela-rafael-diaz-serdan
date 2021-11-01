import { createAction, props } from '@ngrx/store';
import { User } from '@rds-auth/models/user.model';

export const checkAdminRole = createAction(
  '[Auth Role] Check admin role',
  props<{ id: string }>()
);
export const checkTeacherRole = createAction(
  '[Auth Role] Check teacher role',
  props<{ id: string }>()
);
export const fillUser = createAction(
  '[Auth Effect] Merge user',
  props<{ id: string }>()
);
export const getUser = createAction('[Auth User] Get user');
export const notAuthenticated = createAction(
  '[Auth] Authentication Fail',
  props<{ error: any }>()
);
export const saveUser = createAction(
  '[Auth Firebase] Save user to firebase',
  props<{ user: User }>()
);
export const signIn = createAction('[AccountUser] Google`s sign-in request');
export const signInFail = createAction('[Auth SignIn] Google`s sign-in Fail');
export const signInSuccess = createAction(
  '[Auth SignIn] Google`s sign-in Success',
  props<{ user: User }>()
);
export const signOut = createAction(
  '[Auth SignOut] Google`s sign-out request',
  props<{ id: string }>()
);
export const signOutCompleted = createAction(
  '[Auth SignOut] Google`s sign-out completed'
);
export const updateAdminRole = createAction(
  '[Auth Role] Update admin role',
  props<{ isAdmin: boolean }>()
);
export const updateOnlineStatus = createAction(
  '[Auth Online] Update online status',
  props<{ id: string; isOnline: boolean }>()
);
export const updateTeachersRole = createAction(
  '[Auth Role] Update teacher role',
  props<{ isTeacher: boolean }>()
);
