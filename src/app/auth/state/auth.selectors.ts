import { createFeatureSelector, createSelector } from '@ngrx/store';
import { User } from '@rds-auth/models/user.model';
import { AuthenticationState, authFeatureKey } from './auth.reducer';

export const selectAuthState =
  createFeatureSelector<AuthenticationState>(authFeatureKey);

export const isOnline = createSelector(
  selectAuthState,
  (state: AuthenticationState): boolean => !!state.user
);
export const isAdmin = createSelector(
  selectAuthState,
  (state: AuthenticationState): boolean => state.isAdmin
);
export const isTeacher = createSelector(
  selectAuthState,
  (state: AuthenticationState): boolean => state.isTeacher
);
export const selectUser = createSelector(
  selectAuthState,
  (state: AuthenticationState): User => state.user!
);

export const getError = createSelector(
  selectAuthState,
  (state: AuthenticationState): any => state.error
);
