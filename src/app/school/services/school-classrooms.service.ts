import { Injectable } from '@angular/core';
import { collection, collectionData, Firestore, query, where } from '@angular/fire/firestore';
import { SchoolClassroom } from '@rds-school/models/school-course.model';
import { FirestoreV9Service } from '@rds-shared/generic/firestore-v9.service';
import * as fromSchoolClassrooms from '@rds-store/school/school-classrooms';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
@Injectable()
/** SchoolCoursesService
 *  Service to manage school courses by CRUD operations on Firestore
 */
export class SchoolClassroomsService extends FirestoreV9Service<SchoolClassroom> {
  constructor(
    public afStore: Firestore) {
    super('classrooms', afStore);
  }
  getWithGradeAndCycle(grade: string, cycle: string): Observable<SchoolClassroom> {
    const queryWithParams = query(collection(this.afs, this.tCollection), where('grade', '==', grade), where('cycle', '==', cycle))
    return collectionData(queryWithParams).pipe(take(1), map(x => x[0] as SchoolClassroom));
  }
}
