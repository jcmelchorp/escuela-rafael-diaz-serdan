import { SchoolLevel } from "@rds-auth/models/user.enum";

export interface SchoolCourse {
  id: string;
  name: string;
  description: string;
  grade: SchoolLevel;
  priority: number;
  courseType: CourseType;
}

export enum CourseType {
  formativo,
  optativo,
}

export interface AssignedCourse extends SchoolCourse {
  teacherId: string;
  studentIds: string[];
}
