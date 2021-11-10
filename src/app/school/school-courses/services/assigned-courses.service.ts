import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { AssignedCourse } from '../models/school-course.model';
import * as fromAssignedCourses from '@rds-store/school/assigned-courses';
import { FirebaseV9Service } from '@rds-shared/generic/firebase-v9.service';
import { Database } from '@angular/fire/database';
import { FirestoreV9Service } from '@rds-shared/generic/firestore-v9.service';


@Injectable()
export class AssignedCoursesService extends FirestoreV9Service<AssignedCourse> {
  constructor(
    public afStore: Firestore, public afDatabase: Database) {
    super(fromAssignedCourses.pluralizedEntityName, afStore);
  }
}
