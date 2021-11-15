import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { Score } from '@rds-profile/models/score.model';
import { FirestoreV9Service } from '@rds-shared/generic/firestore-v9.service';
import * as fromScores from '@rds-store/scores';

@Injectable()
export class ProfileService extends FirestoreV9Service<Score> {
  constructor(public firestore: Firestore) {
    super(fromScores.pluralizedEntityName, firestore);
  }
}
