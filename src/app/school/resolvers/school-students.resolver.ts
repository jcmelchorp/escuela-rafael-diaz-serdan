import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, first, map, tap } from 'rxjs/operators';
import { SchoolStudentsEntityService } from '@rds-store/school/school-students/school-students-entity.service';

@Injectable()
export class SchoolStudentsResolver implements Resolve<boolean> {
  constructor(private schoolStudentsEntityService: SchoolStudentsEntityService) { }
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.schoolStudentsEntityService.loading$.pipe(
      tap((loading) => {
        if (!loading) {
          this.schoolStudentsEntityService.getWithQuery({ role: 'Alumnos' });
        }
      }),
      filter((loading) => !!loading),
      first()
    );
  }
}
