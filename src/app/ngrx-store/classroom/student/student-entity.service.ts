import { Injectable } from '@angular/core';

import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';

import * as fromStudent from './';

@Injectable()
export class StudentEntityService
  extends EntityCollectionServiceBase<gapi.client.classroom.Student> {

  constructor(
    serviceElementsFactory:
      EntityCollectionServiceElementsFactory
  ) {
    super(fromStudent.entityCollectionName, serviceElementsFactory);
  }
}
