import { createAction, props } from '@ngrx/store';
import { User } from '@rds-auth/models/user.model';

export const loadApp = createAction('[App] Load App');

export const loadAppSuccess = createAction('[App] Load App Success');

export const loadAppFail = createAction(
  '[App] Load App Fail',
  props<{ error: any }>()
);
export const localStoreUser = createAction(
  '[App] Store in local User',
  props<{ user: User }>()
);

