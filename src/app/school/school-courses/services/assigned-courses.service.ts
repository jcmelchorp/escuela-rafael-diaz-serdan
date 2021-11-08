import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FirestoreService } from '@rds-shared/generic/firestore.service';
import { AssignedCourse } from '../models/school-course.model';


@Injectable()
export class AssignedCoursesService extends FirestoreService<AssignedCourse> {
  constructor(
    public afStore: AngularFirestore) {
    super('courses', afStore);
  }
}
