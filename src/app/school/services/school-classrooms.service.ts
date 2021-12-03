import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { SchoolClassroom } from '@rds-school/models/school-course.model';
import { FirestoreV9Service } from '@rds-shared/generic/firestore-v9.service';
import * as fromSchoolClassrooms from '@rds-store/school/school-classrooms';
@Injectable()
/** SchoolCoursesService
 *  Service to manage school courses by CRUD operations on Firestore
 */
export class SchoolClassroomsService extends FirestoreV9Service<SchoolClassroom> {
  constructor(
    public afStore: Firestore) {
    super('classrooms', afStore);
  }
}
