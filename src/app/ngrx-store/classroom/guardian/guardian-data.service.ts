import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';

import { UserProfilesService } from '@rds-classroom/user-profiles/services/user-profiles.service';

import { from, Observable } from 'rxjs';
import * as fromGuardian from './'
@Injectable()
export class GuardianDataService extends DefaultDataService<gapi.client.classroom.Guardian> {
  constructor(
    http: HttpClient,
    httpUrlGenerator: HttpUrlGenerator,
    private userProfilesService: UserProfilesService
  ) {
    super(fromGuardian.entityCollectionName, http, httpUrlGenerator);
  }
  getWithQuery(studentId: string): Observable<gapi.client.classroom.Guardian[]> {
    return from(
      this.userProfilesService.getGuardians(studentId)
    );
  }
}
