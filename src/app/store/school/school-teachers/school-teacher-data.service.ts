import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { DefaultDataService, HttpUrlGenerator, QueryParams } from '@ngrx/data';
import { Update } from '@ngrx/entity';
import { User } from '@rds-auth/models/user.model';
import { SchoolTeachersService } from '@rds-school/school-courses/services/school-tearchers.service';

import { from, Observable } from 'rxjs';

import * as fromTeacher from '.';

@Injectable()
export class SchoolTeachersDataService extends DefaultDataService<User> {
  constructor(
    http: HttpClient,
    httpUrlGenerator: HttpUrlGenerator,
    private schoolTeachersService: SchoolTeachersService
  ) {
    super(fromTeacher.entityCollectionName, http, httpUrlGenerator);
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
  add(course: User): Observable<User> {
    return this.schoolTeachersService.add(course);
  }
  update(course: Update<User>): Observable<User> {
    return this.schoolTeachersService.update(course.id.toString(), course.changes);
  }
  delete(key: string): Observable<string> {
    return this.schoolTeachersService.delete(key);
  }
}
