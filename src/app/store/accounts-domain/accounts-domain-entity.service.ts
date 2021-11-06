import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from '@ngrx/data';
import { AccountDomain } from '../../accounts/models/account-domain.model';
import * as fromAccountsDomain from '.';

@Injectable()

export class AccountsDomainEntityService extends EntityCollectionServiceBase<AccountDomain> {
  constructor(
    readonly serviceElementsFactory: EntityCollectionServiceElementsFactory
  ) {
    super(fromAccountsDomain.entityCollectionName, serviceElementsFactory);
  }
}
