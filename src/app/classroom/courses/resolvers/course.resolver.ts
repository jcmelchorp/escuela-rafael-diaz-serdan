import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { TeacherEntityService } from '@rds-root/app/store/classroom/teacher/teacher-entity.service';

import { Observable } from 'rxjs';
import { filter, first, tap } from 'rxjs/operators';

@Injectable()
export class CourseResolver implements Resolve<boolean> {

  constructor(private teacherES: TeacherEntityService) { }
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.teacherES.loading$
      .pipe(
        tap(loading => {
          if (!loading) {
            this.teacherES.getWithQuery(route.paramMap.get('courseId'));
          }
        }),
        filter(loading => !!loading),
        first()
      );
  }
}
