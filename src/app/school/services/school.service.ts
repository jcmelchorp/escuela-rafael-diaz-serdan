import { Inject, Injectable } from '@angular/core';
import { arrayUnion, collection, collectionData, deleteDoc, doc, Firestore, getDoc, query, serverTimestamp, setDoc, updateDoc, where, orderBy } from '@angular/fire/firestore';
import { QueryParams } from '@ngrx/data';
import { SchoolClassroom, SchoolCourse } from '@rds-school/models/school-course.model';
import { firebaseSerialize } from '@rds-shared/models/firebase.model';
import { arrayRemove } from 'firebase/firestore';
import { from, Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable()
export class SchoolService {
  public readonly tCollection: string;
  public readonly colects: Observable<SchoolClassroom[]>;
  constructor(
    public readonly afs: Firestore,
  ) {
    this.tCollection = 'classrooms';
    if (!this.tCollection) {
      throw new Error('Firestore called with no collection name');
    }
  }
  add(entity: SchoolClassroom, id?: string,): Observable<SchoolClassroom> {
    const refColl = collection(this.afs, this.tCollection);
    if (id) {
      const refDoc = doc(refColl, id)
      return from(updateDoc(refDoc, firebaseSerialize({ ...entity, id: refDoc.id }))).pipe(take(1), map(_ => firebaseSerialize({ ...entity, id: refDoc.id })));
    } else {
      const refDoc = doc(refColl)
      return from(setDoc(refDoc, firebaseSerialize({ ...entity, id: refDoc.id }))).pipe(take(1), map(_ => firebaseSerialize({ ...entity, id: refDoc.id })));
    }


  }
  update(id: string, entity: Partial<SchoolClassroom>): Observable<SchoolClassroom> {
    const refDoc = doc(this.afs, this.tCollection, id);
    return from(updateDoc(refDoc, firebaseSerialize(entity))).pipe(take(1), map(x => firebaseSerialize(entity)));
  }
  async addCourseIdToClassroom(id: string, courseId: string) {
    const refDoc = doc(this.afs, this.tCollection, id);
    return await updateDoc(refDoc, { coursesIds: arrayUnion(courseId) });
  }
  async addStudentEmailToClassroom(classroomId: string, studentEmail: string) {
    const refDoc = doc(this.afs, this.tCollection, classroomId);
    return await updateDoc(refDoc, { studentsEmails: arrayUnion(studentEmail) });
  }
  async updateCoursesInClassroom(classroomId: string, coursesIds) {
    const refDoc = doc(this.afs, this.tCollection, classroomId);
    return await updateDoc(refDoc, { coursesIds: coursesIds });
  }
  async updateStudentsInClassroom(classroomId: string, studentsEmails: string[]) {
    const refDoc = doc(this.afs, this.tCollection, classroomId);
    return await updateDoc(refDoc, { studentsEmails: studentsEmails });
  }
  async removeCourseFromClassroom(classroomId: string, courseId: string) {
    const refDoc = doc(this.afs, this.tCollection, classroomId);
    return await updateDoc(refDoc, { coursesIds: arrayRemove(courseId) });
  }
  async removeStudentFromClassroom(classroomId: string, studentEmail: string) {
    const refDoc = doc(this.afs, this.tCollection, classroomId);
    return await updateDoc(refDoc, { studentsEmails: arrayRemove(studentEmail) });
  }
  getById(id: string): Observable<SchoolClassroom> {
    const refDoc = doc(this.afs, this.tCollection, id);
    return from(getDoc(refDoc)).pipe(map(x => x.data() as SchoolClassroom));
  }
  getWithGradeAndCycle(grade: string, cycle: string): Observable<SchoolClassroom> {
    const queryWithParams = query(collection(this.afs, this.tCollection), where('grade', '==', grade), where('cycle', '==', cycle))
    return collectionData(queryWithParams).pipe(take(1), map(x => x[0] as SchoolClassroom));
  }
  delete(id: string): Observable<string> {
    const refDoc = doc(this.afs, this.tCollection, id);
    return from(deleteDoc(refDoc)).pipe(take(1), map(_ => id));
  }
  list(): Observable<SchoolClassroom[]> {
    const refCollection = collection(this.afs, this.tCollection);
    const queryCollection = query(refCollection, orderBy('grade', 'asc'));
    return collectionData(queryCollection).pipe(map(x => x as SchoolClassroom[]));
  }


  getWithQuery(queryParams: QueryParams): Observable<SchoolClassroom[]> {
    const queryWithParams = query(collection(this.afs, this.tCollection), orderBy('grade', 'asc'), where(Object.keys(queryParams).pop(), '==', Object.values(queryParams).pop()))
    return collectionData(queryWithParams, { idField: 'id' }).pipe(take(1), map(x => x as SchoolClassroom[]));

  }

  upsert(entity: SchoolClassroom): Observable<any> {
    const tCollection = doc(collection(this.afs, this.tCollection));
    return from(setDoc(tCollection, entity, { merge: true }));
  }


  getMany(field: string, predicate: any, value: any): Observable<SchoolClassroom[]> {
    const queryWithParams = query(collection(this.afs, this.tCollection), orderBy('priority', 'asc'), where(field, predicate, value));
    return collectionData(queryWithParams, { idField: 'id' }).pipe(take(1), map(x => x as SchoolClassroom[]));
  }
}
