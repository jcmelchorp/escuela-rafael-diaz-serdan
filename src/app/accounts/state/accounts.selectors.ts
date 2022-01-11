import { EntitySelectorsFactory } from '@ngrx/data';
import { createSelector } from '@ngrx/store';
import { User } from '@rds-auth/models/user.model';
import { getCurrentQueryParams } from '@rds-store/router/router.selectors';

import * as fromAccounts from '@rds-store/accounts';
import { getCurrentParams } from '../../store/router/router.selectors';
export const accountSelectors = new EntitySelectorsFactory().create<User>(
  fromAccounts.entityCollectionName
);

export const selectAccounts = createSelector(
  accountSelectors.selectEntities,
  (accountEntities) => accountEntities
);

export const selectedAccountById = createSelector(
  getCurrentParams,
  accountSelectors.selectEntities,
  (params, accountEntities) =>
    accountEntities.find((u) => u.id == params.id)
);
