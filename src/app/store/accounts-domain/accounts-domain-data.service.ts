import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DefaultDataService, HttpUrlGenerator, QueryParams } from '@ngrx/data';
import { Update } from '@ngrx/entity';
import { Observable, from } from 'rxjs';
import * as fromAccountDomain from '@rds-store/accounts-domain';
import { AccountDomain } from '../../accounts/models/account-domain.model';
import { AccountsDomainService } from '../../accounts/services/accounts-domain.service';

@Injectable()
export class AccountsDomainDataService extends DefaultDataService<AccountDomain> {
  constructor(
    http: HttpClient,
    httpUrlGenerator: HttpUrlGenerator,
    private accountsDomainService: AccountsDomainService
  ) {
    super(fromAccountDomain.entityCollectionName, http, httpUrlGenerator);
  }
  getAll(): Observable<AccountDomain[]> {
    return from(this.accountsDomainService.listAllUsers());
  }
  getWithQuery(queryParams: QueryParams): Observable<AccountDomain[]> {
    return from(this.accountsDomainService.getStudents(queryParams));
  }
  update(user: Update<AccountDomain>): Observable<AccountDomain> {
    return from(this.accountsDomainService.updateUser(user.changes));
  }
  getByKey(userKey: string): Observable<AccountDomain> {
    return from(this.accountsDomainService.getAccountsDomain(userKey));
  }
  add(user: Partial<AccountDomain>) {
    return from(this.accountsDomainService.addUser(user));
  }
}
