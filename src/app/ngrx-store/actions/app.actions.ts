import { createAction, props } from '@ngrx/store';

export const loadApp = createAction('[App] Load App');

export const loadAppSuccess = createAction('[App] Load App Success');

export const loadAppFail = createAction(
  '[App] Load App Fail',
  props<{ error: any }>()
);
