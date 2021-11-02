import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';

import { StudentEntityService } from '@rds-store/classroom/student/student-entity.service';

import { Observable, of } from 'rxjs';
import { filter, first, map, tap } from 'rxjs/operators';

@Injectable()
export class StudentsResolver implements Resolve<boolean> {
  constructor(
    private studentES: StudentEntityService,
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.studentES.loading$
      .pipe(
        tap(loading => {
          if (!loading) {
            this.studentES.getWithQuery(route.parent.parent.paramMap.get('courseId'));
          }
        }),
        filter(loading => !!loading),
        first()
      );
  }
}
