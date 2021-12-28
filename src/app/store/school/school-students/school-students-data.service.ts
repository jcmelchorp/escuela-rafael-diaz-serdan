import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DefaultDataService, HttpUrlGenerator, QueryParams } from '@ngrx/data';
import { Update } from '@ngrx/entity';
import { User } from '@rds-auth/models/user.model';
import { SchoolStudentsService } from '@rds-school/services';
import { from, Observable } from 'rxjs';
import * as fromAccounts from './../../accounts';
@Injectable()
export class SchoolStudentsDataService extends DefaultDataService<User> {
  constructor(
    http: HttpClient,
    httpUrlGenerator: HttpUrlGenerator,
    private schoolStudentsService: SchoolStudentsService
  ) {
    super(fromAccounts.entityCollectionName, http, httpUrlGenerator);
  }

  getAll(): Observable<User[]> {
    return this.schoolStudentsService.list();
  }
  getWithQuery(queryParams: QueryParams): Observable<User[]> {
    return this.schoolStudentsService.getWithQuery(queryParams);
  }
  getByKey(key: string): Observable<User> {
    return this.schoolStudentsService.getById(key);
  }
  add(course: User): Observable<User> {
    return this.schoolStudentsService.add(course);
  }
  update(course: Update<User>): Observable<User> {
    return this.schoolStudentsService.update(course.id.toString(), course.changes);
  }
  delete(key: string): Observable<string> {
    return this.schoolStudentsService.delete(key);
  }
}
