import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';

import { TeachersService } from '@rds-classroom/teachers/services/teachers.service';

import { from, Observable } from 'rxjs';

import * as fromTeacher from './';

@Injectable()
export class TeacherDataService extends DefaultDataService<gapi.client.classroom.Teacher> {
  constructor(
    http: HttpClient,
    httpUrlGenerator: HttpUrlGenerator,
    private teachersService: TeachersService
  ) {
    super(fromTeacher.entityCollectionName, http, httpUrlGenerator);
  }

  getWithQuery(courseId: string): Observable<gapi.client.classroom.Teacher[]> {
    return from(this.teachersService.getTeachers(courseId));
  }
  add(teacher: gapi.client.classroom.Teacher): Observable<gapi.client.classroom.Teacher> {
    return from(this.teachersService.addTeacher(teacher));
  }
}
