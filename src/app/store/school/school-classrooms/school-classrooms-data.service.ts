import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DefaultDataService, HttpUrlGenerator, QueryParams } from '@ngrx/data';
import { Update } from '@ngrx/entity';
import { SchoolClassroom } from '@rds-school/models/school-course.model';
import { SchoolClassroomsService, SchoolService } from '@rds-school/services';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import * as fromClassroom from '.';

@Injectable()
export class SchoolClassroomsDataService extends DefaultDataService<SchoolClassroom> {
  constructor(
    http: HttpClient,
    httpUrlGenerator: HttpUrlGenerator,
    private schoolClassroomsService: SchoolService
  ) {
    super(fromClassroom.entityCollectionName, http, httpUrlGenerator);
  }

  getAll(): Observable<SchoolClassroom[]> {
    return this.schoolClassroomsService.list();
  }

  getWithQuery(queryParams: QueryParams): Observable<SchoolClassroom[]> {
    return this.schoolClassroomsService.getWithQuery(queryParams);
  }
  getByKey(key: string): Observable<SchoolClassroom> {
    return this.schoolClassroomsService.getById(key);
  }
  add(course: SchoolClassroom): Observable<SchoolClassroom> {
    return this.schoolClassroomsService.add(course);
  }
  update(course: Update<SchoolClassroom>): Observable<SchoolClassroom> {
    return this.schoolClassroomsService.update(course.id.toString(), course.changes);
  }
  delete(key: string): Observable<string> {
    return this.schoolClassroomsService.delete(key);
  }
}
