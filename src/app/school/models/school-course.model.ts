import { SchoolLevel } from "@rds-auth/models/user.enum";
export interface StudentsCourses {
  studentId: string;
  courseId: string;
}
export interface SchoolCourse {
  id: string;
  name: string;
  description: string;
  grade: SchoolLevel;
  courseType: CourseType;
  teacherEmail: string;
  cycle: Cycle;
  priority: number;
}

export interface SchoolClassroom {
  id: string;
  grade: string;
  cycle: Cycle;
  studentsEmails?: string[];
  coursesIds?: string[];
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
