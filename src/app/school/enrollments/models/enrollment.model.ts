import { AssignedCourse } from "@rds-school/school-courses/models/school-course.model";


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
