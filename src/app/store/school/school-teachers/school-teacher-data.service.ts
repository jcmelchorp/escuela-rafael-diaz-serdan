import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DefaultDataService, HttpUrlGenerator, QueryParams } from '@ngrx/data';
import { Update } from '@ngrx/entity';
import { User } from '@rds-auth/models/user.model';
import { SchoolTeachersService } from '@rds-school/services/school-tearchers.service';
import { from, Observable } from 'rxjs';
import * as fromAccounts from './../../accounts';

@Injectable()
export class SchoolTeachersDataService extends DefaultDataService<User> {
  constructor(
    http: HttpClient,
    httpUrlGenerator: HttpUrlGenerator,
    private schoolTeachersService: SchoolTeachersService
  ) {
    super(fromAccounts.entityCollectionName, http, httpUrlGenerator);
  }

  getAll(): Observable<User[]> {
    return this.schoolTeachersService.list();
  }
  getWithQuery(queryParams: QueryParams): Observable<User[]> {
    return this.schoolTeachersService.getWithQuery(queryParams);
  }
  getByKey(key: string): Observable<User> {
    return this.schoolTeachersService.getById(key);
  }
  add(teacher: User): Observable<User> {
    return from(this.schoolTeachersService.add(teacher));
  }
  update(teacher: Update<User>): Observable<User> {
    return this.schoolTeachersService.update(teacher.id.toString(), teacher.changes as User);
  }
  delete(key: string): Observable<string> {
    return this.schoolTeachersService.delete(key);
  }
}
