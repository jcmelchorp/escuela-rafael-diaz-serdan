import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DefaultDataService, HttpUrlGenerator, QueryParams } from '@ngrx/data';
import { Update } from '@ngrx/entity';
import { Observable } from 'rxjs';
import * as fromClass from '.';
import { SchoolCoursesService } from '@rds-school/school-courses/services/school-courses.service';
import { Score } from '@rds-profile/models/score.model';
import { ProfileService } from '@rds-profile/services/profile.service';
@Injectable()
export class ScoresDataService extends DefaultDataService<Score> {
  constructor(
    http: HttpClient,
    httpUrlGenerator: HttpUrlGenerator,
    private profileServices: ProfileService
  ) {
    super(fromClass.entityCollectionName, http, httpUrlGenerator);
  }

  getAll(): Observable<Score[]> {
    return this.profileServices.list();
  }

  getWithQuery(queryParams: QueryParams): Observable<Score[]> {
    return this.profileServices.getWithQuery(queryParams);
  }
  getByKey(key: string): Observable<Score> {
    return this.profileServices.getById(key);
  }
  add(course: Score): Observable<Score> {
    return this.profileServices.add(course);
  }
  update(course: Update<Score>): Observable<Score> {
    return this.profileServices.update(course.id.toString(), course.changes);
  }
  delete(key: string): Observable<string> {
    return this.profileServices.delete(key);
  }
}
