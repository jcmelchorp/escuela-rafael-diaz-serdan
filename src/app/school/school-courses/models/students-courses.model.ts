import { User } from "@rds-auth/models/user.model"
import { AssignedCourse } from './school-course.model';

export class StudentsCourses {
  studentId: string;
  student: User;
  courseId: string;
  course: AssignedCourse;

}
