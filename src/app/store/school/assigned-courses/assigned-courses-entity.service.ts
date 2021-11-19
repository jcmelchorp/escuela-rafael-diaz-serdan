import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from '@ngrx/data';
import { AssignedCourse } from '@rds-school/models/school-course.model';
import * as fromAssignedCourses from '.';
@Injectable()
export class AssignedCoursesEntityService extends EntityCollectionServiceBase<AssignedCourse> {
  constructor(
    readonly serviceElementsFactory: EntityCollectionServiceElementsFactory
  ) {
    super(fromAssignedCourses.entityCollectionName, serviceElementsFactory);
  }
}
