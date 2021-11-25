import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from '@ngrx/data';
import { SchoolCourse } from '@rds-school/models/school-course.model';
import * as fromSchoolCourses from '@rds-store/school/school-courses';
@Injectable()
export class SchoolCoursesEntityService extends EntityCollectionServiceBase<SchoolCourse> {
  constructor(
    readonly serviceElementsFactory: EntityCollectionServiceElementsFactory
  ) {
    super(fromSchoolCourses.entityCollectionName, serviceElementsFactory);
  }
}
