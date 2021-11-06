import { EntitySelectorsFactory } from '@ngrx/data';
import { createSelector } from '@ngrx/store';
import { User } from '@rds-auth/models/user.model';
import { getCurrentQueryParams } from '@rds-root/app/store/router/router.selectors';

import * as fromAccounts from '@rds-root/app/store/accounts';
export const accountSelectors = new EntitySelectorsFactory().create<User>(
  fromAccounts.entityCollectionName
);

export const selectAccounts = createSelector(
  accountSelectors.selectEntities,
  (accountEntities) => accountEntities
);

export const selectedAccountById = createSelector(
  getCurrentQueryParams,
  accountSelectors.selectEntities,
  (queryParams, accountEntities) =>
    accountEntities.find((u) => u.id == queryParams.id)
);
