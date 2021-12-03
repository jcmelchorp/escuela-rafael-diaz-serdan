import { SchoolComponent } from './school/school.component';
import { SchoolCoursesComponent } from './school-courses/school-courses.component';
import { SchoolClassroomsComponent } from './school-classrooms/school-classrooms.component';
export const SCHOOL_CONTAINERS: any[] = [
  SchoolCoursesComponent,
  SchoolClassroomsComponent,
  SchoolComponent
];
export * from './school-courses/school-courses.component';
export * from './school/school.component';
export * from './school-classrooms/school-classrooms.component';
