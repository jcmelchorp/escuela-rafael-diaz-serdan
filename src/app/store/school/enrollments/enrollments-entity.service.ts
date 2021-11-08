import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { Enrollment } from '@rds-school/enrollments/models/enrollment.model';
import * as fromEnrollments from '.';
@Injectable()
export class EnrollmentsEntityService extends EntityCollectionServiceBase<Enrollment> {
  constructor(
    readonly serviceElementsFactory: EntityCollectionServiceElementsFactory
  ) {
    super(fromEnrollments.entityCollectionName, serviceElementsFactory);
  }
}
