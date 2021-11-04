import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FirebaseService } from '@rds-shared/generic/firebase.service';

import { SchoolCourse } from '../models/school-course.model';

@Injectable()
export class SchoolCoursesService extends FirebaseService<SchoolCourse> {
  constructor(
    public afDatabase: AngularFireDatabase,
    public afStore: AngularFirestore) {
    super('courses', afStore, afDatabase);
  }
}
