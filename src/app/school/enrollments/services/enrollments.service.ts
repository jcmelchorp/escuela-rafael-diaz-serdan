import { Injectable } from '@angular/core';
//import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import * as fromEnrollments from '@rds-store/school/enrollments'
import { FirestoreV9Service } from '@rds-shared/generic/firestore-v9.service';
import { Enrollment, EnrollmentLabel } from '../models/enrollment.model';
import { collection, Firestore, where } from '@angular/fire/firestore';
import { query } from '@angular/animations';

@Injectable()
export class EnrollmentsService extends FirestoreV9Service<Enrollment> {
  constructor(
    public afStore: Firestore) {
    super(fromEnrollments.pluralizedEntityName, afStore);
  }

  /* getEnrollments(): Observable<EnrollmentLabel[]> {
    query(collection(this.afStore,fromEnrollments.pluralizedEntityName), where("capital", "==", true));
    // return this.afStore.collection<EnrollmentLabel>(fromEnrollments.pluralizedEntityName).valueChanges({ idField: 'id' });
  }
  getDefaultEnrollmentId(): Observable<string> {
    return this.afStore
      .collection<EnrollmentLabel>(fromEnrollments.pluralizedEntityName, (ref) => ref.where('isDefault', '==', true))
      .valueChanges()
      .pipe(
        map(enrollments => enrollments[0].id)
      );
  }*/
}
