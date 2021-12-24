import { createReducer, on } from '@ngrx/store';
import { User } from '@rds-auth/models/user.model';
import * as authActions from './auth.actions';

export const authFeatureKey = 'auth';
export interface AuthenticationState {
  user: User;
  isAdmin: boolean;
  isOnline: boolean;
  isTeacher: boolean;
  error: any;
}

export const initialState: AuthenticationState = {
  user: null,
  isAdmin: false,
  isOnline: false,
  isTeacher: false,
  error: null,
};

export const authReducer = createReducer<AuthenticationState>(
  initialState,
  on(authActions.signInSuccess, (state, action) => {
    return {
      ...state,
      user: action.user,
      isOnline: true,
    };
  }),
  on(authActions.signInFail, (state) => {
    return {
      ...state,
      user: null,
    };
  }),
  on(authActions.notAuthenticated, (state, action) => {
    return {
      ...state,
      error: action.error,
    };
  }),
  on(authActions.signOutCompleted, (state) => {
    return {
      ...state,
      user: null,
      isAdmin: false,
      isTeacher: false,
      isOnline: false,
    };
  }),
  on(authActions.updateAdminRole, (state, action) => {
    return {
      ...state,
      isAdmin: action.isAdmin,
    };
  }),
  on(authActions.updateTeachersRole, (state, action) => {
    return {
      ...state,
      isTeacher: action.isTeacher,
    };
  }),
  on(authActions.updateOnlineStatus, (state, action) => {
    return {
      ...state,
      isOnline: action.isOnline,
    };
  })
);
