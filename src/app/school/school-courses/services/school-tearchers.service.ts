import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { User } from '@rds-auth/models/user.model';
import { FirestoreV9Service } from '@rds-shared/generic/firestore-v9.service';

@Injectable()
export class SchoolTeachersService extends FirestoreV9Service<User> {
  constructor(public firestore: Firestore) {
    super('users', firestore);
  }
}
