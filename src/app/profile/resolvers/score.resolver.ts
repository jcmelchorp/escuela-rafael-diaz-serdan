import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '@rds-store/app.state';
import { ScoresEntityService } from '@rds-store/scores/school-entity.service';
import { Observable, of } from 'rxjs';
import { filter, first, tap } from 'rxjs/operators';
import { ProfileService } from '../services/profile.service';

@Injectable()
export class ScoreResolver implements Resolve<boolean> {
  constructor(
    private scoresEntityService: ScoresEntityService,
    private store: Store<AppState>,
  ) { }
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.scoresEntityService.loading$
      .pipe(
        tap(loaded => {
          if (!loaded) {
            this.scoresEntityService.getByKey(route.queryParams.cycle);
          }
        }),
        filter(loaded => !!loaded),
        first()
      );
  }
}
