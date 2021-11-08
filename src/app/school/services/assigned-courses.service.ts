import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FirebaseService } from '@rds-shared/generic/firebase.service';

import { SchoolCourse } from '../models/school-course.model';
import { FirestoreService } from '../../shared/generic/firestore.service';
import { AssignedCourse } from '@rds-school/models/assigned-course.model';

@Injectable()
export class AssignedCoursesService extends FirestoreService<AssignedCourse> {
  constructor(
    public afStore: AngularFirestore) {
    super('assignedCourses', afStore);
  }
}
