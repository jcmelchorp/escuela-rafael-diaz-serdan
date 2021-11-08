import { AssignedCourse } from "./assigned-course.model";
import { SchoolCourse } from "./school-course.model";

export interface Enrollment extends EnrollmentLabel {
  assignedCourses?: AssignedCourse[]
}
export interface EnrollmentLabel {
  id: string;
  label: string;
  startYear: number;
  endYear: string;
  isDefault: boolean;
}
