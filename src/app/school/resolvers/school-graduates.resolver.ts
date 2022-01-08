import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { AccountsEntityService } from "@rds-store/accounts/accounts-entity.service";
import { Observable } from "rxjs";
import { filter, first, tap } from "rxjs/operators";

@Injectable()
export class SchoolGraduatesResolver implements Resolve<boolean> {
  constructor(private accountsEntityService: AccountsEntityService) { }
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.accountsEntityService.loading$.pipe(
      tap((loading) => {
        if (!loading) {
          this.accountsEntityService.getWithQuery({ role: 'Graduados' });
        }
      }),
      filter((loading) => !!loading),
      first()
    );
  }
}
