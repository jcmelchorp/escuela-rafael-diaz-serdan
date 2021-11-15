import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from '@ngrx/data';
import * as fromScores from '.';
import { Score } from '../../profile/models/score.model';
@Injectable()
export class ScoresEntityService extends EntityCollectionServiceBase<Score> {
  constructor(
    readonly serviceElementsFactory: EntityCollectionServiceElementsFactory
  ) {
    super(fromScores.entityCollectionName, serviceElementsFactory);
  }
}
