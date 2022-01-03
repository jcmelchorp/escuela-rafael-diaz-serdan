import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DefaultDataService, HttpUrlGenerator, QueryParams } from '@ngrx/data';
import { Update } from '@ngrx/entity';
import { from, Observable } from 'rxjs';
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
  add(score: Score): Observable<Score> {
    return from(this.scoreServices.add(score));
  }
  update(score: Update<Score>): Observable<Score> {
    return this.scoreServices.update(score.id.toString(), score.changes as Score);
  }
  delete(key: string): Observable<string> {
    return this.scoreServices.delete(key);
  }
}
