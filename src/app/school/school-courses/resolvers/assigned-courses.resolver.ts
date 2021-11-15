import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { AssignedCoursesEntityService } from '@rds-store/school/assigned-courses/assigned-courses-entity.service';


import { Observable } from 'rxjs';
import { filter, tap, first } from 'rxjs/operators';

@Injectable()
export class AssignedCoursesResolver implements Resolve<boolean> {
  constructor(private assignedCoursesEntityService: AssignedCoursesEntityService) { }
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.assignedCoursesEntityService.loaded$.pipe(
      tap((loaded) => {
        if (!loaded) {
          this.assignedCoursesEntityService.getAll();
        }
      }),
      filter((loaded) => !!loaded),
      first()
    );
  }
}
