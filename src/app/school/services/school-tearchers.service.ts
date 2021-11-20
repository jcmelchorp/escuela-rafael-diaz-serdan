import { Injectable } from '@angular/core';
import { Database } from '@angular/fire/database';
import { Firestore } from '@angular/fire/firestore';
import { User } from '@rds-auth/models/user.model';
import { FirebaseV9Service } from '@rds-shared/generic/firebase-v9.service';

@Injectable()
export class SchoolTeachersService extends FirebaseV9Service<User> {
  constructor(public firestore: Firestore, public database: Database) {
    super('users', firestore, database);
  }
}
