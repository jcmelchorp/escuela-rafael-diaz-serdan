import { Injectable } from '@angular/core';

import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { Group } from '@rds-accounts/models/account-domain.model';


import * as fromGroup from '.';

@Injectable()
export class GroupsEntityService extends EntityCollectionServiceBase<Group> {
  constructor(readonly serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super(fromGroup.entityCollectionName, serviceElementsFactory);
  }
}
