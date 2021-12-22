import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DefaultDataService, HttpUrlGenerator, QueryParams } from '@ngrx/data';
import { Update } from '@ngrx/entity';
import { Observable } from 'rxjs';
import * as fromScore from '.';
import { Score } from '@rds-profile/models/score.model';
import { ScoresService } from '../../teachers/services/scores.service';
@Injectable()
export class ScoresDataService extends DefaultDataService<Score> {
  constructor(
    http: HttpClient,
    httpUrlGenerator: HttpUrlGenerator,
    private scoreServices: ScoresService
  ) {
    super(fromScore.entityCollectionName, http, httpUrlGenerator);
  }

  getAll(): Observable<Score[]> {
    return this.scoreServices.list();
  }

  getWithQuery(queryParams: QueryParams): Observable<Score[]> {
    return this.scoreServices.getWithQuery(queryParams);
  }
  getByKey(key: string): Observable<Score> {
    return this.scoreServices.getById(key);
  }
  add(course: Score): Observable<Score> {
    return this.scoreServices.add(course);
  }
  update(course: Update<Score>): Observable<Score> {
    return this.scoreServices.update(course.id.toString(), course.changes);
  }
  delete(key: string): Observable<string> {
    return this.scoreServices.delete(key);
  }
}
