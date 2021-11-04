import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from '@ngrx/data';
import { Observable } from 'rxjs';
import * as fromCourseRoom from '.';
import { QueryParams } from '@ngrx/data';
import { SchoolCourse } from '@rds-root/app/school/models/school-course.model';
@Injectable()
export class SchoolCoursesEntityService extends EntityCollectionServiceBase<SchoolCourse> {
  constructor(
    readonly serviceElementsFactory: EntityCollectionServiceElementsFactory
  ) {
    super(fromCourseRoom.entityCollectionName, serviceElementsFactory);
  }
}
