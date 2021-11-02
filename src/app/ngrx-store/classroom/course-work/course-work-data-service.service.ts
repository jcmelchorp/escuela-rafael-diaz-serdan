import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';

import { CourseWorksService } from '@rds-classroom/course-works/services/course-works.service';

import { from, Observable } from 'rxjs';

import * as fromCourseWork from './';
@Injectable()
export class CourseWorkDataService extends DefaultDataService<gapi.client.classroom.CourseWork> {
  constructor(
    http: HttpClient,
    httpUrlGenerator: HttpUrlGenerator,
    private courseWorksService: CourseWorksService
  ) {
    super(fromCourseWork.entityCollectionName, http, httpUrlGenerator);
  }
  getWithQuery(courseId: string): Observable<gapi.client.classroom.CourseWork[]> {
    return from(this.courseWorksService.getCourseWorks(courseId));
  }
}
