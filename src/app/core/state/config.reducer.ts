import { createReducer, on } from "@ngrx/store";
import * as configActions from './config.actions';
export const configFeatureKey = 'config';

export interface ConfigState {
  isDark: boolean;
}

export const initialState: ConfigState = {
  isDark: false,
};
export const configReducer = createReducer<ConfigState>(
  initialState,
  on(configActions.toggleDarkModeSuccess, configActions.setDarkModeSuccess, (state, action) => {
    return {
      ...state,
      isDark: action.isDark,
    };
  }),
  on(configActions.toggleDarkModeFail, configActions.setDarkModeFail, (state, action) => {
    return {
      ...state,
      error: action.error,
    };
  }),
);
