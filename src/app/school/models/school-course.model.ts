import { SchoolLevel } from "@rds-auth/models/user.enum";
import { User } from "@rds-auth/models/user.model";
export interface StudentsCourses {
  studentId: string;
  courseId: string;
}
export interface SchoolCourse {
  id: string;
  priority: number;
  name: string;
  description: string;
  grade: SchoolLevel;
  courseType: CourseType;
  teacherEmail: string;
  teacherPhotoUrl?: string;
  cycle: Cycle;
  studentsEmails?: string[];
}

export interface SchoolClassroom {
  id: string;
  grade: SchoolLevel;
  cycle: Cycle;
  priority?: number;
  studentsEmails?: string[];
  students?: User[];
  coursesIds?: string[];
  courses?: SchoolCourse[];
}


export enum CourseType {
  FORMATIVO = 'Formativo',
  OPTATIVO = 'Optativo',
}

export enum Cycle {
  CE20202021 = '2020-2021',
  CE20212022 = '2021-2022',
  CE20222023 = '2022-2023',
}
