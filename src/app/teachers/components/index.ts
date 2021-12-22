import { ScoresEditComponent } from './scores-edit/scores-edit.component';
import { TeacherCoursesComponent } from './teacher-courses/teacher-courses.component';
import { TeachersDashboardComponent } from './teachers-dashboard/teachers-dashboard.component';
import { TeachersGradeComponent } from './teachers-grade/teachers-grade.component';

export const TEACHERS_COMPONENTS: any[] = [
  TeachersDashboardComponent,
  ScoresEditComponent,
  TeacherCoursesComponent,
  // TeachersGradeComponent
]
export * from './teachers-dashboard/teachers-dashboard.component';
export * from './teacher-courses/teacher-courses.component';
export * from './scores-edit/scores-edit.component';
export * from './teachers-grade/teachers-grade.component';

