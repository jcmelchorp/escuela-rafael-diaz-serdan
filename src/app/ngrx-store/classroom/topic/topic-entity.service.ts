import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import * as fromTopic from './';

@Injectable()
export class TopicEntityService extends EntityCollectionServiceBase<gapi.client.classroom.Topic> {
  constructor(readonly serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super(fromTopic.entityCollectionName, serviceElementsFactory);
  }

}
