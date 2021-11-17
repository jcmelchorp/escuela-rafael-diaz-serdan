import { Injectable } from '@angular/core';

import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { User } from '@rds-auth/models/user.model';

import * as fromTeacher from '.';
@Injectable()
export class SchoolTeachersEntityService extends EntityCollectionServiceBase<User> {
  constructor(readonly serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super(fromTeacher.entityCollectionName, serviceElementsFactory);
  }
}
