import { Injectable } from '@angular/core';

import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import * as fromGuardian from './'

@Injectable()
export class GuardianEntityService extends EntityCollectionServiceBase<gapi.client.classroom.Guardian> {

  constructor(
    serviceElementsFactory:
      EntityCollectionServiceElementsFactory
  ) {
    super(fromGuardian.entityCollectionName, serviceElementsFactory);
  }
}
