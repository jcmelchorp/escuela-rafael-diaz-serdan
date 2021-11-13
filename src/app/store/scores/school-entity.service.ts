import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from '@ngrx/data';
import { Observable } from 'rxjs';
import * as fromCourseRoom from '.';
import { QueryParams } from '@ngrx/data';
import { SchoolCourse } from '@rds-school/school-courses/models/school-course.model';
import { Score } from '../../profile/models/score.model';
@Injectable()
export class ScoresEntityService extends EntityCollectionServiceBase<Score> {
  constructor(
    readonly serviceElementsFactory: EntityCollectionServiceElementsFactory
  ) {
    super(fromCourseRoom.entityCollectionName, serviceElementsFactory);
  }
}
