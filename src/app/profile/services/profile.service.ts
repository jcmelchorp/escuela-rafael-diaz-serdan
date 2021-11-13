import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { FirestoreV9Service } from '../../shared/generic/firestore-v9.service';
import { Score } from '../models/score.model';

@Injectable()
export class ProfileService extends FirestoreV9Service<Score> {
  constructor(public readonly firestore: Firestore) {
    super('scores', firestore);
  }
}
