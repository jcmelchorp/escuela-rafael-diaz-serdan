import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from '@ngrx/data';
import { SchoolCycle } from '@rds-school/models/school-course.model';
import * as fromSchoolCycles from '@rds-store/school/school-cycles';
@Injectable()
export class SchoolCyclesEntityService extends EntityCollectionServiceBase<SchoolCycle> {
  constructor(
    readonly serviceElementsFactory: EntityCollectionServiceElementsFactory
  ) {
    super(fromSchoolCycles.entityCollectionName, serviceElementsFactory);
  }
}
