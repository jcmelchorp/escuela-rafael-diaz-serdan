import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';

import { TopicEntityService } from '@rds-store/classroom/topic/topic-entity.service';
import { StudentSubmissionEntityService } from '@rds-store/classroom/student-submission/student-submission-entity.service';

import { Observable, of } from 'rxjs';
import { filter, first, map, tap } from 'rxjs/operators';


@Injectable()
export class StudentSubmissionsResolver implements Resolve<boolean> {
  constructor(
    private studentSubmissionEntityService: StudentSubmissionEntityService,
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.studentSubmissionEntityService.loading$
      .pipe(
        tap(loading => {
          if (!loading) {
            this.studentSubmissionEntityService.getWithQuery(route.parent.parent.paramMap.get('courseId'));
          }
        }),
        filter(loading => !!loading),
        first()
      );
  }
}
