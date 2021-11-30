import { Injectable } from '@angular/core';
import {
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
  Resolve
} from '@angular/router';
import { Store } from '@ngrx/store';
import { selectUser, selectUserId } from '@rds-auth/state/auth.selectors';
import { AppState } from '@rds-store/app.state';
import { ScoresEntityService } from '@rds-store/scores/scores-entity.service';
import { Observable, of, Subscription } from 'rxjs';
import { filter, first, tap, map, switchMap, mergeMap, concatMap } from 'rxjs/operators';

@Injectable()
export class ScoresResolver implements Resolve<boolean> {
  userId;
  constructor(
    private scoresEntityService: ScoresEntityService,
    private store: Store<AppState>
  ) {
    this.store.select(selectUserId).subscribe(id => this.userId = id).unsubscribe();
  }
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.scoresEntityService.loaded$.pipe(
      tap((loaded) => {
        if (!loaded) {
          this.scoresEntityService.getWithQuery({ userId: this.userId });
        }
      }),
      filter((loaded) => !!loaded),
      first()
    )
  }
}
