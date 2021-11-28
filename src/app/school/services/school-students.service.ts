import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { User } from '@rds-auth/models/user.model';
import { FirebaseV9Service } from '@rds-shared/generic/firebase-v9.service';
import { FirestoreV9Service } from '@rds-shared/generic/firestore-v9.service';
import { Database } from '@angular/fire/database';
import * as fromSchoolStudents from '@rds-store/school/school-students';

@Injectable()
export class SchoolStudentsService extends FirestoreV9Service<User> {
  constructor(
    public afStore: Firestore, public db: Database) {
    super('users', afStore, /* db */);
  }
}
