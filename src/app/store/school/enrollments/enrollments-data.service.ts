import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';
import { Update } from '@ngrx/entity';
import { Enrollment } from '@rds-school/models/enrollment.model';
import { EnrollmentsService } from '@rds-school/services/enrollments.service';

import { from, Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import * as fromEnrollments from '.';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentsDataService extends DefaultDataService<Enrollment> {
  constructor(
    http: HttpClient,
    httpUrlGenerator: HttpUrlGenerator,
    private enrollmentsService: EnrollmentsService
  ) {
    super(fromEnrollments.entityCollectionName, http, httpUrlGenerator);
  }

  getAll(): Observable<Enrollment[]> {
    return this.enrollmentsService.list();
  }
  getByKey(id: string): Observable<Enrollment> {
    return this.getById(id)
  }
  getById(id: string): Observable<Enrollment> {
    return this.enrollmentsService.getById(id);
  }
  get(id: string): Observable<Enrollment> {
    return this.enrollmentsService.getById(id);
  }
  add(enrollment: Enrollment): Observable<Enrollment> {
    return this.enrollmentsService.add(enrollment);
  }
  update(enrollment: Update<Enrollment>): Observable<Enrollment> {
    return this.enrollmentsService.update(enrollment.id.toString(), enrollment.changes);
  }
  delete(id: string): Observable<string> {
    return from(this.enrollmentsService.delete(id));
  }
}

