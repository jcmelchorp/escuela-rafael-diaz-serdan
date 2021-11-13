import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { FirestoreV9Service } from '@rds-shared/generic/firestore-v9.service';
import { SchoolCourse } from '../models/school-course.model';
import * as fromSchoolCourses from '@rds-store/school/assigned-courses';
@Injectable()
/** SchoolCoursesService
 *  Service to manage school courses by CRUD operations on Firestore
 */
export class SchoolCoursesService extends FirestoreV9Service<SchoolCourse> {
  constructor(
    public afStore: Firestore) {
    super(fromSchoolCourses.pluralizedEntityName, afStore);
  }
}
