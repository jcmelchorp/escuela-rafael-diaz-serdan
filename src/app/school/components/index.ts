import { SchoolDashboardComponent } from './school-dashboard/school-dashboard.component';
import { EnrollmentDialogComponent } from './enrollment-dialog/enrollment-dialog.component';
import { SchoolCoursesDialogComponent } from './school-courses-dialog/school-courses-dialog.component';
import { SchoolCoursesTableComponent } from './school-courses-table/school-courses-table.component';
import { EnrollmentCourseDialogComponent } from './enrollment-course-dialog/enrollment-course-dialog.component';
import { SchoolInstructionsComponent } from './school-instructions/school-instructions.component';
import { UploadFileDialogComponent } from './upload-file/upload-file-dialog.component';
export const schoolComponents: any[] = [
  EnrollmentDialogComponent,
  EnrollmentCourseDialogComponent,
  SchoolCoursesDialogComponent,
  SchoolCoursesTableComponent,
  SchoolDashboardComponent,
  SchoolInstructionsComponent,
  UploadFileDialogComponent,
];
export * from './enrollment-dialog/enrollment-dialog.component';
export * from './enrollment-course-dialog/enrollment-course-dialog.component';
export * from './school-courses-dialog/school-courses-dialog.component';
export * from './school-courses-table/school-courses-table.component';
export * from './school-dashboard/school-dashboard.component';
export * from './school-instructions/school-instructions.component';
export * from './upload-file/upload-file-dialog.component';
