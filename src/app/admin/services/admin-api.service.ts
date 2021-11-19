import { Injectable } from '@angular/core';
import { getApp } from '@angular/fire/app';
import {
  UserCredential,
  user,
  getMultiFactorResolver,
  authInstance$,
} from '@angular/fire/auth';

import { QueryParams } from '@ngrx/data';
import { AccountDomain, GroupResponse, UserInsert, UserResponse } from '@rds-accounts/models/account-domain.model';

import { environment } from '@rds-env/environment';
import { map } from 'rxjs/operators';

/// <reference path="../../node_modules/@types/gapi/index.d.ts" />
declare var gapi: any;
@Injectable()
export class AdminApiService {
  private _googleAuth!: gapi.auth2.GoogleAuth;
  private _googleUser!: gapi.auth2.GoogleUser;

  constructor() { }
  handleAdminLoad() {
    this._googleAuth = gapi.auth2.getAuthInstance();
    this._googleUser = this._googleAuth.currentUser.get();
    const isAuthorized = this._googleUser.hasGrantedScopes(
      environment.gapi.adminScopes
    );
    if (!isAuthorized) {
      const option: gapi.auth2.SigninOptionsBuilder =
        new gapi.auth2.SigninOptionsBuilder();
      option.setScope(environment.gapi.adminScopes);
      this._googleUser.grant(option).then(
        (success) => {
          //alert(JSON.stringify({ message: "success", value: success }));
        },
        (fail) => {
          alert(JSON.stringify({ message: 'fail', value: fail }));
        }
      );
      gapi.client.load('admin', 'directory_v1', () => {
        //alert('loaded admin directory');
      });
    }
  }

  async insertUser(user: UserInsert) {
    const response: gapi.client.Response<AccountDomain> =
      await gapi.client.directory.users.insert(user);
    return response.result;
  }

  async listAllUsers() {
    const response: gapi.client.Response<UserResponse> =
      await gapi.client.directory.users.list({
        domain: 'rafaeldiazserdan.net',
        orderBy: 'familyName',
        maxResults: 500,
      });
    return response.result.users;
  }

  async getStudents(queryParams: QueryParams) {
    const response: gapi.client.Response<UserResponse> =
      await gapi.client.directory.users.list({
        domain: 'rafaeldiazserdan.net',
        orderBy: 'familyName',
        orgPath:
          'Dirección/Alumnos/' + queryParams.level + '/' + queryParams.grade,
        maxResults: 500,
      });
    return response.result.users;
  }
  async updateUser(user: Partial<AccountDomain>) {
    const response: gapi.client.Response<AccountDomain> =
      await gapi.client.directory.users.update(user);
    console.log(response.result);
    return response.result;
  }

  async getAccountDomain(userId: string, domain?: string) {
    const user = await gapi.client.directory.users
      .get({
        domain: domain || 'rafaeldiazserdan.net',
        userKey: userId,
      })
      .then((resp: { result: any }) => {
        return resp.result;
      });
    return user;
  }

  async getGroups() {
    const response: gapi.client.Response<GroupResponse> =
      await gapi.client.directory.groups.list({
        domain: 'rafaeldiazserdan.net',
      });
    return response.result.groups;
  }

  async createSchoolAnnouncement(
    announcement: gapi.client.classroom.Announcement,
    courseId: string
  ) {
    const params = { ...announcement, courseId };
    console.log(params);
    const response = await gapi.client.classroom.courses.announcements
      .create(params)
      .then((res: { result: any }) => {
        return res.result;
      })
      .catch((err: any) => { });
    console.log(response);
    return response;
  }
}
