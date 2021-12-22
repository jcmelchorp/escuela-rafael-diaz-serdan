import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { SchoolCoursesEntityService } from '@rds-store/school/school-courses/school-courses-entity.service';
import { Observable } from 'rxjs';
import { filter, tap, first } from 'rxjs/operators';

@Injectable()
export class SchoolCoursesResolver implements Resolve<boolean> {
  constructor(private schoolCoursesEntityService: SchoolCoursesEntityService) { }
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.schoolCoursesEntityService.loaded$.pipe(
      tap((loaded) => {
        if (!loaded) {
          this.schoolCoursesEntityService.getAll();
        }
      }),
      filter((loaded) => !!loaded),
      first()
    );
  }
}
