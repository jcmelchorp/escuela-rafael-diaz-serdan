import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DefaultDataService, HttpUrlGenerator, QueryParams } from '@ngrx/data';
import { Update } from '@ngrx/entity';
import { SchoolClassroom } from '@rds-school/models/school-course.model';
import { SchoolClassroomsService, SchoolService } from '@rds-school/services';
import { from, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import * as fromClassroom from '.';

@Injectable()
export class SchoolClassroomsDataService extends DefaultDataService<SchoolClassroom> {
  constructor(
    http: HttpClient,
    httpUrlGenerator: HttpUrlGenerator,
    private schoolClassroomsService: SchoolClassroomsService
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
  add(classroom: SchoolClassroom): Observable<SchoolClassroom> {
    return from(this.schoolClassroomsService.add(classroom));
  }
  update(classroom: Update<SchoolClassroom>): Observable<SchoolClassroom> {
    return this.schoolClassroomsService.update(classroom.id.toString(), classroom.changes as SchoolClassroom);
  }
  delete(key: string): Observable<string> {
    return this.schoolClassroomsService.delete(key);
  }
}
function createClassroomId(grade: string, cycle: string) {
  let x1: string = grade.substring(0, 3);
  let x2: string = grade.charAt(grade.length - 1);
  let x3: string = cycle.substring(4, 6);
  let x4: string = cycle.substring(8, 10);
  return `${x1}${x2}${x3}${x4}`;
}
