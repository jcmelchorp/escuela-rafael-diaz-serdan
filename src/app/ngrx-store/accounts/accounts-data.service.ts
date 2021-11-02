import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';
import { Update } from '@ngrx/entity';
import { User } from '@rds-auth/models/user.model';
import { AccountsService } from '@rds-root/app/accounts/services/accounts.service';
import { from, Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import * as fromUser from './';
@Injectable({
  providedIn: 'root'
})
export class AccountsDataService extends DefaultDataService<User> {
  constructor(
    http: HttpClient,
    httpUrlGenerator: HttpUrlGenerator,
    private accountsService: AccountsService
  ) {
    super(fromUser.entityCollectionName, http, httpUrlGenerator);
  }

  getAll(): Observable<User[]> {
    return this.accountsService.getList().pipe(take(1), map(users => users));
  }

  getWithQuery(grade: string) {
    return this.accountsService.getList().pipe(map(users => users.filter(u => u.grade == grade)));
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
    return this.accountsService.create(user);
  }
  update(update: Update<User>): Observable<User> {
    return this.accountsService.update(update.id.toString(), update.changes);
  }
  delete(userId: string): Observable<string> {
    return from(this.accountsService.delete(userId));
  }
}

