import { User } from "@rds-auth/models/user.model"
import { AssignedCourse } from './school-course.model';
import { getApp } from 'firebase/app';
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { from, Observable } from "rxjs";
import { map } from "rxjs/operators";


export class StudentsCourses {
  student?: User;
  course?: AssignedCourse;
  constructor(private courseId: string, private studentId: string) { }
  async getCourse(): Promise<AssignedCourse> {
    const afs = getFirestore(getApp());
    const refCollection = doc(afs, 'assignedCourses', this.courseId);
    return await getDoc(refCollection).then(x => x.data() as AssignedCourse);
  }
  async getStudent(): Promise<User> {
    const afs = getFirestore(getApp());
    const refCollection = doc(afs, 'users', this.studentId);
    return await getDoc(refCollection).then(x => x.data() as User);
  }
}

