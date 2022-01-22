import { SchoolComponent } from './school/school.component';
import { SchoolCoursesComponent } from './school-courses/school-courses.component';
import { SchoolClassroomsComponent } from './school-classrooms/school-classrooms.component';
import { SchoolCyclesComponent } from './school-cycles/school-cycles.component';
export const SCHOOL_CONTAINERS: any[] = [
  SchoolCoursesComponent,
  SchoolClassroomsComponent,
  SchoolComponent,
  SchoolCyclesComponent,
];
export * from './school-courses/school-courses.component';
export * from './school/school.component';
export * from './school-classrooms/school-classrooms.component';
export * from './school-cycles/school-cycles.component';
