import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DefaultDataService, HttpUrlGenerator, QueryParams } from '@ngrx/data';
import { Update } from '@ngrx/entity';
import { SchoolCourse } from '@rds-school/models/school-course.model';
import { SchoolCoursesService } from '@rds-school/services';
import { from, Observable } from 'rxjs';
import * as fromClass from '.';

@Injectable()
export class SchoolCoursesDataService extends DefaultDataService<SchoolCourse> {
  constructor(
    http: HttpClient,
    httpUrlGenerator: HttpUrlGenerator,
    private schoolCoursesService: SchoolCoursesService
  ) {
    super(fromClass.entityCollectionName, http, httpUrlGenerator);
  }

  getAll(): Observable<SchoolCourse[]> {
    return this.schoolCoursesService.list();
  }

  getWithQuery(queryParams: QueryParams): Observable<SchoolCourse[]> {
    return this.schoolCoursesService.getWithQuery(queryParams);
  }
  getByKey(key: string): Observable<SchoolCourse> {
    return this.schoolCoursesService.getById(key);
  }
  add(course: SchoolCourse): Observable<SchoolCourse> {
    return from(this.schoolCoursesService.add(course));
  }
  update(course: Update<SchoolCourse>): Observable<SchoolCourse> {
    return this.schoolCoursesService.update(course.id.toString(), course.changes as SchoolCourse);
  }
  delete(key: string): Observable<string> {
    return this.schoolCoursesService.delete(key);
  }
}
