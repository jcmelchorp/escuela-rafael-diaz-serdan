import { Injectable } from "@angular/core";
import { Firestore } from "@angular/fire/firestore";
import { SchoolCycle } from "@rds-school/models/school-course.model";
import { FirestoreV9Service } from "@rds-shared/generic/firestore-v9.service";
import * as fromSchoolCycles from '@rds-store/school/school-cycles';

@Injectable()
/** SchoolCyclesService
 *  Service to manage school scholar cycles by CRUD operations on Firestore
 */
export class SchoolCyclesService extends FirestoreV9Service<SchoolCycle> {
  constructor(
    public afStore: Firestore) {
    super(fromSchoolCycles.pluralizedEntityName, afStore);
  }
}
