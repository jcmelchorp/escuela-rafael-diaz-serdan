import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from '@ngrx/data';
import { SchoolClassroom } from '@rds-school/models/school-course.model';
import * as fromClassroom from '.';

@Injectable()
export class SchoolClassroomsEntityService extends EntityCollectionServiceBase<SchoolClassroom> {
  constructor(
    readonly serviceElementsFactory: EntityCollectionServiceElementsFactory
  ) {
    super(fromClassroom.entityCollectionName, serviceElementsFactory);
  }
}
