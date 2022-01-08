import { Injectable } from '@angular/core';
import { arrayRemove, arrayUnion, collection, collectionData, doc, Firestore, query, updateDoc, where } from '@angular/fire/firestore';
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
  async addCourseIdToClassroom(classroomId: string, courseId: string) {
    const refDoc = doc(this.afs, this.tCollection, classroomId);
    return await updateDoc(refDoc, { coursesIds: arrayUnion(courseId) });
  }
  async addStudentEmailToClassroom(classroomId: string, studentEmail: string) {
    const refDoc = doc(this.afs, this.tCollection, classroomId);
    return updateDoc(refDoc, { studentsEmails: arrayUnion(studentEmail) });
  }
  async updateCoursesInClassroom(classroomId: string, coursesIds) {
    const refDoc = doc(this.afs, this.tCollection, classroomId);
    return await updateDoc(refDoc, { coursesIds: arrayUnion(coursesIds) });
  }
  async updateStudentsInClassroom(classroomId: string, studentsEmails: string[]) {
    const refDoc = doc(this.afs, this.tCollection, classroomId);
    return await updateDoc(refDoc, { studentsEmails: arrayUnion(studentsEmails) });
  }
  async removeCourseFromClassroom(classroomId: string, courseId: string) {
    const refDoc = doc(this.afs, this.tCollection, classroomId);
    return await updateDoc(refDoc, { coursesIds: arrayRemove(courseId) });
  }
  async removeStudentFromClassroom(classroomId: string, studentEmail: string) {
    const refDoc = doc(this.afs, this.tCollection, classroomId);
    return await updateDoc(refDoc, { studentsEmails: arrayRemove(studentEmail) });
  }
}
