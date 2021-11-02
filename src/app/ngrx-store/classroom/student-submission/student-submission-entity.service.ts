import { Injectable } from '@angular/core';

import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import * as fromStudentSubmission from './'

@Injectable()
export class StudentSubmissionEntityService extends EntityCollectionServiceBase<gapi.client.classroom.StudentSubmission> {

  constructor(
    serviceElementsFactory:
      EntityCollectionServiceElementsFactory
  ) {
    super(fromStudentSubmission.entityCollectionName, serviceElementsFactory);
  }
}
