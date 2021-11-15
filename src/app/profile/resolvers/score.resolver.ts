import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Store } from '@ngrx/store';
import { STATE_PROVIDERS } from '@ngrx/store/src/state';
import { selectUser } from '@rds-auth/state/auth.selectors';
import { AppState } from '@rds-store/app.state';
import { ScoresEntityService } from '@rds-store/scores/scores-entity.service';
import { Observable, of, Subscription } from 'rxjs';
import { filter, first, tap, map, switchMap, mergeMap, concatMap } from 'rxjs/operators';
import { ProfileService } from '../services/profile.service';

@Injectable()
export class ScoreResolver implements Resolve<boolean> {
  userId: string = '';
  constructor(
    private scoresEntityService: ScoresEntityService,
    private store: Store<AppState>
  ) {
    this.store.select(selectUser).subscribe(user => this.userId = user.id);
  }
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.scoresEntityService.loading$.pipe(
      tap((loaded) => {
        if (!loaded) {
          this.scoresEntityService.getByKey(this.userId + route.queryParams.p);
        }
      }),
      filter((loaded) => !!loaded),
      first()
    )
  }
}
