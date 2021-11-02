import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';

import { CourseWorksService } from '@rds-classroom/course-works/services/course-works.service';

import { from, Observable } from 'rxjs';
import * as fromStudentSubmission from './'

@Injectable()
export class StudentSubmissionDataService extends DefaultDataService<gapi.client.classroom.StudentSubmission> {
  constructor(
    http: HttpClient,
    httpUrlGenerator: HttpUrlGenerator,
    private courseWroksService: CourseWorksService,
  ) {
    super(fromStudentSubmission.entityCollectionName, http, httpUrlGenerator);
  }
  getWithQuery(queryParams: { courseId, courseWorkId }): Observable<gapi.client.classroom.StudentSubmission[]> {
    return from(
      this.courseWroksService.getStudentSubmissions(queryParams.courseId, queryParams.courseWorkId)
    );
  }
}
