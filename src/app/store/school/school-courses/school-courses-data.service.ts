import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StringMap } from '@angular/compiler/src/compiler_facade_interface';

import { DefaultDataService, HttpUrlGenerator, QueryParams } from '@ngrx/data';
import { Update } from '@ngrx/entity';



import { concat, from, merge, Observable, of } from 'rxjs';
import { tap, concatMap, switchMap, mergeMap, map, mergeAll, concatAll, toArray } from 'rxjs/operators';

import * as fromClass from '.';
import { SchoolCoursesService } from '@rds-root/app/school/services/school-courses.service';
import { SchoolCourse } from '@rds-root/app/school/models/school-course.model';

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
    return this.schoolCoursesService.add(course);
  }
  update(course: Update<SchoolCourse>): Observable<SchoolCourse> {
    return this.schoolCoursesService.update(course.id.toString(), course.changes);
  }
  delete(key: string): Observable<string> {
    return this.schoolCoursesService.delete(key);
  }
}
