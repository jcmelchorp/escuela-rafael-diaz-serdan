import { Injectable } from '@angular/core';

import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';

import * as fromTeacher from './';
@Injectable()
export class TeacherEntityService extends EntityCollectionServiceBase<gapi.client.classroom.Teacher> {
  constructor(readonly serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super(fromTeacher.entityCollectionName, serviceElementsFactory);
  }
}
