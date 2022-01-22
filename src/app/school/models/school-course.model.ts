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
  teacher?: User;
  cycle: Cycle;
  /*  studentsEmails?: string[]; */
}
export interface SchoolCycle {
  id: string;
  label: string;
  isCurrentDefault: boolean;
}
export interface ISchoolClassroom {
  id?: string;
  grade: SchoolLevel;
  cycle: Cycle;
  priority?: number;
  studentsEmails?: string[];
  students?: User[];
  coursesIds?: string[];
  courses?: SchoolCourse[];
  addCourses?(courses: SchoolCourse[]): void
  addStudents?(students: User[]): void
}
export class SchoolClassroom implements ISchoolClassroom {
  id?: string;
  grade: SchoolLevel;
  cycle: Cycle;
  priority?: number;
  public studentsEmails?: string[];
  public students?: User[];
  public coursesIds?: string[];
  public courses?: SchoolCourse[];

  constructor(inputClassroom?: ISchoolClassroom) {
    this.id = inputClassroom?.id;
    this.grade = inputClassroom?.grade;
    this.cycle = inputClassroom?.cycle;
    this.priority = inputClassroom?.priority;
    this.studentsEmails = [];
    this.coursesIds = [];
    this.students = [];
    this.courses = [];
  }
  addCourses?(courses: SchoolCourse[]) {
    this.courses.push(...courses);
  }
  addStudents?(students: User[]) {
    this.students.push(...students);
  }
  addCoursesIds?(coursesIds: string[]) {
    this.coursesIds.push(...coursesIds);
  }
  addStudentsEmails?(studentsEmails: string[]) {
    this.studentsEmails.push(...studentsEmails);
  }
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
