import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';

import { AnnouncementEntityService } from '@rds-root/app/store/classroom/announcement/announcement-entity.service';

import { Observable } from 'rxjs';
import { filter, first, tap } from 'rxjs/operators';

@Injectable()
export class AnnouncementResolver implements Resolve<boolean> {
  constructor(
    private announcementES: AnnouncementEntityService,
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.announcementES.loading$
      .pipe(
        tap(loading => {
          if (!loading) {
            this.announcementES.getWithQuery(route.parent.parent.paramMap.get('courseId'));
          }
        }),
        filter(loading => !!loading),
        first()
      );
  }
}
