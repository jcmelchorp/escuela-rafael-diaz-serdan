import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';

import { TopicEntityService } from '@rds-root/app/store/classroom/topic/topic-entity.service';

import { Observable, of } from 'rxjs';
import { filter, first, map, tap } from 'rxjs/operators';


@Injectable()
export class TopicsResolver implements Resolve<boolean> {
  constructor(
    private topicEntityService: TopicEntityService,
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.topicEntityService.loading$
      .pipe(
        tap(loading => {
          if (!loading) {
            this.topicEntityService.getWithQuery(route.parent.parent.paramMap.get('courseId'));
          }
        }),
        filter(loading => !!loading),
        first()
      );
  }
}
