import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { DefaultDataService, HttpUrlGenerator, QueryParams } from '@ngrx/data';
import { Update } from '@ngrx/entity';
import { AssignedCourse } from '@rds-school/school-courses/models/school-course.model';
import { AssignedCoursesService } from '@rds-school/school-courses/services/assigned-courses.service';
import { Observable } from 'rxjs';
import * as fromAssignedCourses from '.';


@Injectable()
export class AssignedCoursesDataService extends DefaultDataService<AssignedCourse> {
  constructor(
    http: HttpClient,
    httpUrlGenerator: HttpUrlGenerator,
    private assignedCoursesService: AssignedCoursesService
  ) {
    super(fromAssignedCourses.entityCollectionName, http, httpUrlGenerator);
  }

  getAll(): Observable<AssignedCourse[]> {
    return this.assignedCoursesService.list();
  }

  getWithQuery(queryParams: QueryParams): Observable<AssignedCourse[]> {
    return this.assignedCoursesService.getWithQuery(queryParams);
  }
  getByKey(key: string): Observable<AssignedCourse> {
    return this.assignedCoursesService.getById(key);
  }
  add(course: AssignedCourse): Observable<AssignedCourse> {
    return this.assignedCoursesService.add(course);
  }
  update(course: Update<AssignedCourse>): Observable<AssignedCourse> {
    return this.assignedCoursesService.update(course.id.toString(), course.changes);
  }
  delete(key: string): Observable<string> {
    return this.assignedCoursesService.delete(key);
  }
}
