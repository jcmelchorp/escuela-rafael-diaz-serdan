import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { CourseEntityService } from '@rds-store/classroom/course/course-entity.service';

import { Observable } from 'rxjs';
import { filter, first, map, tap } from 'rxjs/operators';

@Injectable()
export class CoursesResolver implements Resolve<boolean> {

  constructor(private courseEntityService: CourseEntityService) { }
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.courseEntityService.loaded$
      .pipe(
        tap(loaded => {
          if (!loaded) {
            this.courseEntityService.getAll();
          }
        }),
        filter(loaded => !!loaded),
        first()
      );
  }
}
