import { Injectable } from '@angular/core';

import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { User } from '@rds-auth/models/user.model';

import * as fromSchoolStudents from '.';
@Injectable()
export class SchoolStudentsEntityService extends EntityCollectionServiceBase<User> {
  constructor(readonly serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super(fromSchoolStudents.entityCollectionName, serviceElementsFactory);
  }
}
