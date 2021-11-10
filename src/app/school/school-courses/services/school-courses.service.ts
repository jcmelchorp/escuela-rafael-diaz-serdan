import { Injectable } from '@angular/core';
/* import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFirestore } from '@angular/fire/compat/firestore'; */
import { Firestore } from '@angular/fire/firestore';
/* import { FirebaseService } from '@rds-shared/generic/firebase.service';
 */import { FirestoreV9Service } from '@rds-shared/generic/firestore-v9.service';
import { SchoolCourse } from '../models/school-course.model';
import * as fromSchoolCourses from '@rds-store/school/assigned-courses';


@Injectable()
export class SchoolCoursesService extends FirestoreV9Service<SchoolCourse> {
  constructor(
    public afStore: Firestore) {
    super(fromSchoolCourses.pluralizedEntityName, afStore);
  }
}
