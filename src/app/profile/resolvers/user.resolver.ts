import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Store } from "@ngrx/store";
import { selectUserId } from "@rds-auth/state/auth.selectors";
import { AccountsEntityService } from "@rds-store/accounts/accounts-entity.service";
import { AppState } from "@rds-store/app.state";
import { Observable } from "rxjs";
import { filter, first, tap } from "rxjs/operators";

@Injectable()
export class UserResolver implements Resolve<boolean> {
  userId;
  constructor(
    private accountsEntityService: AccountsEntityService,
    private store: Store<AppState>
  ) {
    this.store.select(selectUserId).subscribe(id => this.userId = id).unsubscribe();
  }
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.accountsEntityService.loading$.pipe(
      tap((loaded) => {
        if (!loaded) {
          this.accountsEntityService.getByKey(this.userId);
        }
      }),
      filter((loaded) => !!loaded),
      first()
    )
  }
}
