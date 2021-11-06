import { metaReducers } from "../reducers";

export const storeConfig = {
  metaReducers,
  runtimeChecks: {
    strictStateImmutability: true,
    strictActionImmutability: true,
    strictStateSerializability: true,
    strictActionSerializability: true,
    strictActionWithinNgZone: true,
    strictActionTypeUniqueness: true,
  },
};
