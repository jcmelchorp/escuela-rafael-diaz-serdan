import { Injectable } from '@angular/core';

import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';

import * as fromCourse from './';

@Injectable()
export class CourseEntityService extends EntityCollectionServiceBase<gapi.client.classroom.Course> {
  constructor(readonly serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super(fromCourse.entityCollectionName, serviceElementsFactory);
  }
}
