import { SchoolCourseDialogComponent } from "./school-courses-dialog/school-course-dialog.component";
import { SchoolCoursesTableComponent } from "./school-courses-table/school-courses-table.component";
import { AddStudentsCoursesComponent } from './add-students-courses/add-students-courses.component';
import { StudentsCoursesComponent } from './students-courses/students-courses.component';
import { SchoolStudentsTableComponent } from './school-students-table/school-students-table.component';
import { SchoolDashboardComponent } from './school-dashboard/school-dashboard.component';

export const SCHOOL_COMPONENTS: any[] = [
  AddStudentsCoursesComponent,
  SchoolCourseDialogComponent,
  SchoolCoursesTableComponent,
  StudentsCoursesComponent,
  SchoolStudentsTableComponent,
  SchoolDashboardComponent
];
export * from "./school-courses-dialog/school-course-dialog.component";
export * from "./school-courses-table/school-courses-table.component";
export * from "./add-students-courses/add-students-courses.component";
export * from "./students-courses/students-courses.component";
export * from "./school-students-table/school-students-table.component";
export * from "./school-dashboard/school-dashboard.component";
