import { Injectable } from '@angular/core';

import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';

import * as fromCourseWork from './';
@Injectable()
export class CourseWorkEntityService
  extends EntityCollectionServiceBase<gapi.client.classroom.CourseWork> {

  constructor(
    serviceElementsFactory:
      EntityCollectionServiceElementsFactory
  ) {
    super(fromCourseWork.entityCollectionName, serviceElementsFactory);
  }
}
