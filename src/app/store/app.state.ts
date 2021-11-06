import { RouterState } from "@ngrx/router-store";
import { AuthenticationState, authFeatureKey } from "@rds-auth/state/auth.reducer";
import { routerKey } from "./router";

export interface AppState {
  [authFeatureKey]: AuthenticationState;
  [routerKey]: RouterState;
}
