import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { SchoolClassroomsEntityService } from '@rds-store/school/school-classrooms/school-classrooms-entity.service';
import { Observable, of } from 'rxjs';
import { filter, first, tap } from 'rxjs/operators';

@Injectable()
export class SchoolClassroomsResolver implements Resolve<boolean> {
  constructor(private schoolClassroomsEntityService: SchoolClassroomsEntityService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.schoolClassroomsEntityService.loaded$.pipe(
      tap((loaded) => {
        if (!loaded) {
          this.schoolClassroomsEntityService.getAll();
        }
      }),
      filter((loaded) => !!loaded),
      first()
    );
  }
}
