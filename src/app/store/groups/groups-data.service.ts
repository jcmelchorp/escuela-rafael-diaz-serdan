import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';
import { Group } from '@rds-accounts/models/account-domain.model';

import { AdminApiService } from '@rds-admin/services/admin-api.service';

import { Observable, from } from 'rxjs';

import * as fromGroup from '.';
@Injectable()
export class GroupsDataService extends DefaultDataService<Group>  {

  constructor(
    http: HttpClient,
    httpUrlGenerator: HttpUrlGenerator,
    private adminApiService: AdminApiService
  ) {
    super(fromGroup.entityCollectionName, http, httpUrlGenerator);
  }
  getAll(): Observable<Group[]> {
    return from(this.adminApiService.getGroups());
  }
}
