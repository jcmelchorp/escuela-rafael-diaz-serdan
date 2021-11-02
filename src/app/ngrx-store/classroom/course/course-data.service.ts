import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { DefaultDataService, HttpUrlGenerator, QueryParams } from '@ngrx/data';
import { Update } from '@ngrx/entity';

import { CoursesService } from '@rds-classroom/courses/services/courses.service';

import { from, Observable, of } from 'rxjs';

import * as fromCourse from './';
@Injectable()
export class CourseDataService extends DefaultDataService<gapi.client.classroom.Course> {
  constructor(
    http: HttpClient,
    httpUrlGenerator: HttpUrlGenerator,
    private coursesService: CoursesService
  ) {
    super(fromCourse.entityCollectionName, http, httpUrlGenerator);
  }
  getAll(): Observable<gapi.client.classroom.Course[]> {
    return from(this.coursesService.getCourses());
  }
  getWithQuery(queryParams?: QueryParams) {
    return from(this.coursesService.getCourses(queryParams));
  }
  getByKey(courseId: string): Observable<gapi.client.classroom.Course> {
    return this.getById(courseId)
  }
  add(course: gapi.client.classroom.Course): Observable<gapi.client.classroom.Course> {
    return from(
      this.coursesService.createCourse(course)
    )
  }
  update(update: Update<gapi.client.classroom.Course>) {
    return from(this.coursesService.updateCourse(update.id, update.changes))
  }
}
