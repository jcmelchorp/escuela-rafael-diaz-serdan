import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { FirestoreService } from '../../shared/generic/firestore.service';
import { Enrollment, EnrollmentLabel } from '../models/enrollment.model';
import * as fromEnrollments from '@rds-store/school/enrollments'

@Injectable()
export class EnrollmentsService extends FirestoreService<Enrollment> {
  constructor(
    public readonly afStore: AngularFirestore) {
    super(fromEnrollments.pluralizedEntityName, afStore);
  }
  getEnrollments(): Observable<EnrollmentLabel[]> {
    return this.afStore.collection<EnrollmentLabel>(fromEnrollments.pluralizedEntityName).valueChanges({ idField: 'id' });
  }
  getDefaultEnrollmentId(): Observable<string> {
    return this.afStore
      .collection<EnrollmentLabel>(fromEnrollments.pluralizedEntityName, (ref) => ref.where('isDefault', '==', true))
      .valueChanges()
      .pipe(
        map(enrollments => enrollments[0].id)
      );
  }
}
