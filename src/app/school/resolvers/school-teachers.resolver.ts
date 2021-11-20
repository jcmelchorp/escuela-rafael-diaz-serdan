import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, first, map, tap } from 'rxjs/operators';
import { selectUser } from '@rds-auth/state/auth.selectors';
import { SchoolTeachersEntityService } from '@rds-store/school/school-teachers/school-teacher-entity.service';

@Injectable()
export class SchoolTeachersResolver implements Resolve<boolean> {
  constructor(private schoolTeachersEntityService: SchoolTeachersEntityService) { }
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.schoolTeachersEntityService.loaded$.pipe(
      tap((loaded) => {
        if (!loaded) {
          this.schoolTeachersEntityService.getWithQuery({ role: 'Profesores' });
          /* .pipe(
            map(users => users.filter(user => user.role === 'Profesores'))) */
        }
      }),
      filter((loaded) => !!loaded),
      first()
    );
  }
}
