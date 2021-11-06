import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { CourseEntityService } from '@rds-root/app/store/classroom/course/course-entity.service';
import { Observable, of } from 'rxjs';
import { filter, first, tap } from 'rxjs/operators';

@Injectable()
export class StudentCoursesResolver implements Resolve<boolean> {
  constructor(private courseES: CourseEntityService) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.courseES.loading$.pipe(
      tap((loading) => {
        if (!loading) {
          this.courseES.getWithQuery({
            studentId: route.paramMap.get('studentId'),
          });
        }
      }),
      filter((loading) => !!loading),
      first()
    );
  }
}
