import { Injectable, Optional } from "@angular/core";

import { Actions, createEffect, ofType } from "@ngrx/effects";

import * as fromAuthActions from '@rds-auth/state/auth.actions';

import { UserProfilesService } from '@rds-classroom/user-profiles/services/user-profiles.service';

import { map, skipUntil, switchMap } from "rxjs/operators";

@Injectable()
export class UserProfileEffects {

  /* checkTeacherRole$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromAuthActions.checkTeacherRole),
        switchMap((action) =>
          this.authFire.checkTeacherRole(action.id)
            .pipe(
              map((isTeacher: boolean) => fromAuthActions.updateTeachersRole({ isTeacher }))
            )
        )
      )
  ); */

  constructor(
    private actions$: Actions,
    private userProfilesService: UserProfilesService
  ) { }
}
