import { SchoolLevel } from "@rds-auth/models/user.enum";

export interface SchoolCourse {
  id: string;
  name: string;
  description: string;
  grade: SchoolLevel;
  courseType: CourseType;
}
export class AssignedCourse implements SchoolCourse {
  id: string;
  name: string;
  description: string;
  grade: SchoolLevel;
  courseType: CourseType;
  teacherEmail: string;
  cycleId: string;
  priority: number;
  studentsEmails?: string[];
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
