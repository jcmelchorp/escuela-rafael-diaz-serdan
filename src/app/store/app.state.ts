import { RouterState } from "@ngrx/router-store";
import { routerReducer } from '@ngrx/router-store';
import { Action, ActionReducer, ActionReducerMap, INIT, MetaReducer } from '@ngrx/store';
import { AuthenticationState, authFeatureKey, authReducer } from '@rds-auth/state/auth.reducer';
import * as authActions from '@rds-auth/state/auth.actions';
import { environment } from '@rds-env/environment';
import { routerKey } from "./router";
import { configFeatureKey, configReducer, ConfigState } from '@rds-core/state/config.reducer';
export interface AppState {
  [authFeatureKey]: AuthenticationState;
  [routerKey]: RouterState;
  [configFeatureKey]: ConfigState
}
export const reducers: ActionReducerMap<AppState> = {
  [authFeatureKey]: authReducer,
  [routerKey]: routerReducer,
  [configFeatureKey]: configReducer
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? [debug, /* logout */]
  : [];

export function debug(
  reducer: ActionReducer<AppState>
): ActionReducer<AppState> {
  return (state: AppState | undefined, action: Action) => {
    console.groupCollapsed(`Action type: ${action.type}`);
    console.log(
      `%c Preview State: `,
      `color: #007bb4; font-weight: bold`,
      state
    );
    console.log(`%c Action: `, `color: #b46c00; font-weight: bold`, action);
    const nextState = reducer(state, action);
    console.log(
      `%c Next State: `,
      `color: #196d00; font-weight: bold`,
      nextState
    );
    console.groupEnd();
    return nextState;
  };
}

export function logout(
  reducer: ActionReducer<AppState, Action>
): ActionReducer<AppState, Action> {
  return (state, action) => {
    if (action != null && action.type === authActions.signOut.type) {
      return reducer(undefined, { type: INIT });
    }
    return reducer(state, action);
  };
}
