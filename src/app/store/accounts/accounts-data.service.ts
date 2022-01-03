import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DefaultDataService, HttpUrlGenerator, QueryParams } from '@ngrx/data';
import { Update } from '@ngrx/entity';
import { User } from '@rds-auth/models/user.model';
import { AccountsService } from '@rds-accounts/services/accounts.service';
import { from, Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import * as fromUser from '.';
@Injectable()
export class AccountsDataService extends DefaultDataService<User> {
  constructor(
    http: HttpClient,
    httpUrlGenerator: HttpUrlGenerator,
    private accountsService: AccountsService
  ) {
    super(fromUser.entityCollectionName, http, httpUrlGenerator);
  }

  getAll(): Observable<User[]> {
    return this.accountsService.list();
  }

  /*  getWithQuery(value: any): Observable<User[]> {
     return this.accountsService.getWithQuery('role', value);
   } */
  getWithQuery(queryParams: QueryParams): Observable<User[]> {
    return this.accountsService.getWithQuery(queryParams);
  }
  getByKey(userId: string): Observable<User> {
    return this.getById(userId)
  }
  getById(userId: string): Observable<User> {
    return this.accountsService.getById(userId);
  }
  get(userId: string): Observable<User> {
    return this.accountsService.getById(userId);
  }
  add(user: Partial<User>): Observable<User> {
    return from(this.accountsService.add(user as User));
  }
  update(update: Update<User>): Observable<User> {
    return this.accountsService.update(update.id.toString(), update.changes as User);
  }
  delete(userId: string): Observable<string> {
    return from(this.accountsService.delete(userId));
  }
}

