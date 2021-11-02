import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';

import { UserProfilesService } from '@rds-classroom/user-profiles/services/user-profiles.service';

import { from, Observable } from 'rxjs';

import * as fromUserProfile from './';
@Injectable()
export class UserProfileDataService extends DefaultDataService<gapi.client.classroom.UserProfile> {


  constructor(
    http: HttpClient,
    httpUrlGenerator: HttpUrlGenerator,
    private userProfilesService: UserProfilesService
  ) {
    super(fromUserProfile.entityCollectionName, http, httpUrlGenerator);
  }

  getByQuery(id: string): Observable<gapi.client.classroom.UserProfile> {
    return from(this.userProfilesService.getUserProfile(id));
  }
}
