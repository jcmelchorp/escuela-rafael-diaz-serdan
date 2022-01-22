import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DefaultDataService, HttpUrlGenerator, QueryParams } from '@ngrx/data';
import { Update } from '@ngrx/entity';
import { SchoolCycle } from '@rds-school/models/school-course.model';
import { SchoolCyclesService } from '@rds-school/services';
import { from, Observable } from 'rxjs';
import * as fromSchoolCycle from '.';

@Injectable()
export class SchoolCyclesDataService extends DefaultDataService<SchoolCycle> {
  constructor(
    http: HttpClient,
    httpUrlGenerator: HttpUrlGenerator,
    private schoolCycleService: SchoolCyclesService
  ) {
    super(fromSchoolCycle.entityCollectionName, http, httpUrlGenerator);
  }

  getAll(): Observable<SchoolCycle[]> {
    return this.schoolCycleService.list();
  }

  getWithQuery(queryParams: QueryParams): Observable<SchoolCycle[]> {
    return this.schoolCycleService.getWithQuery(queryParams);
  }
  getByKey(key: string): Observable<SchoolCycle> {
    return this.schoolCycleService.getById(key);
  }
  add(course: SchoolCycle): Observable<SchoolCycle> {
    return from(this.schoolCycleService.add(course));
  }
  update(course: Update<SchoolCycle>): Observable<SchoolCycle> {
    return this.schoolCycleService.update(course.id.toString(), course.changes as SchoolCycle);
  }
  delete(key: string): Observable<string> {
    return this.schoolCycleService.delete(key);
  }
}
