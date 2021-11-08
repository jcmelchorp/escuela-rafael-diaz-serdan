import { SchoolCoursesComponent } from './school-courses/school-courses.component';
import { SchoolComponent } from './school/school.component';
import { EnrollmentComponent } from './enrollment/enrollment.component';
export const schoolContainers: any[] = [
  EnrollmentComponent,
  SchoolComponent,
  SchoolCoursesComponent];
export * from './enrollment/enrollment.component';
export * from './school/school.component';
export * from './school-courses/school-courses.component';
