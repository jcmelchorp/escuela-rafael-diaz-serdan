import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { GroupsEntityService } from '@rds-store/groups/groups-entity.service';


import { Observable } from 'rxjs';
import { filter, first, map, tap } from 'rxjs/operators';


@Injectable()
export class GroupsResolver implements Resolve<boolean> {

  constructor(private groupsEntityService: GroupsEntityService) { }
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.groupsEntityService.loaded$
      .pipe(
        tap(loaded => {
          if (!loaded) {
            this.groupsEntityService.getAll();
          }
        }),
        filter(loaded => !!loaded),
        first()
      );
  }
}
