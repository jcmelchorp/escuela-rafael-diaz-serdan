import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { EnrollmentsEntityService } from '@rds-store/school/enrollments/enrollments-entity.service';
import { Observable, of } from 'rxjs';
import { filter, first, tap } from 'rxjs/operators';

@Injectable()
export class EnrollmentResolver implements Resolve<boolean> {
  constructor(private enrollmentsEntityService: EnrollmentsEntityService) { }
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.enrollmentsEntityService.loading$
      .pipe(
        tap(loading => {
          if (!loading) {
            this.enrollmentsEntityService.getByKey(route.params.enrollmentId);
          }
        }),
        filter(loading => !!loading),
        first()
      );
  }
}
