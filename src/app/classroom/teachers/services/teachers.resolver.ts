import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
  ActivatedRoute
} from '@angular/router';

import { TeacherEntityService } from '@rds-store/classroom/teacher/teacher-entity.service';

import { Observable, of } from 'rxjs';
import { filter, first, tap } from 'rxjs/operators';

@Injectable()
export class TeachersResolver implements Resolve<boolean> {

  constructor(
    private teacherEntityService: TeacherEntityService,
  ) { }
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.teacherEntityService.loading$
      .pipe(
        tap(loading => {
          if (!loading) {
            this.teacherEntityService.getWithQuery(route.parent.parent.paramMap.get('courseId'));
          }
        }),
        filter(loading => !!loading),
        first()
      );

  }
}
