import { SchoolCourse } from "./school-course.model";
import { User } from '../../auth/models/user.model';

export interface AssignedCourse {
  id?: string;
  courseId: string;
  course?: SchoolCourse;
  teacherId: string;
  teacher?: User
  studentIds: string[];
}
