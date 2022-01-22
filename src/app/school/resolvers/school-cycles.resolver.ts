import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { filter, first, tap } from "rxjs/operators";
import { SchoolCyclesEntityService } from '@rds-store/school/school-cycles/school-cycles-entity.service';
@Injectable()
export class SchoolCyclesResolver implements Resolve<boolean> {
  constructor(private schoolCyclesEntityService: SchoolCyclesEntityService) { }
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.schoolCyclesEntityService.loaded$.pipe(
      tap((loaded) => {
        if (!loaded) {
          this.schoolCyclesEntityService.getAll();
        }
      }),
      filter((loaded) => !!loaded),
      first()
    );
  }
}
