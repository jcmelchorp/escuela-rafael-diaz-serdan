import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssignedCoursesResolver } from './school-courses/resolvers/assigned-courses.resolver';
import { SchoolComponent } from './school.component';
import { SchoolDashboardComponent } from './school-dashboard/school-dashboard.component';
import { SchoolUsersResolver } from './school-courses/resolvers/school-users.resolver';
import { EnrollmentComponent } from './enrollments/containers/enrollment/enrollment.component';
import { SchoolCoursesComponent } from './school-courses/containers/school-courses/school-courses.component';
import { EnrollmentResolver } from './enrollments/resolvers/enrollment.resolver';
import { NotFoundComponent } from '@rds-shared/components';
import { StudentsCoursesComponent } from './school-courses/containers/students-courses/students-courses.component';
import { TeachersResolver } from './school-courses/resolvers/teachers.resolver';
import { AccountsResolver } from '../accounts/resolvers/accounts.resolver';
const routes: Routes = [
  {
    path: '',
    component: SchoolComponent,
    children: [
      {
        path: '',
        component: SchoolDashboardComponent,
        resolve: { teachers: AccountsResolver },
        data: { breadcrumb: 'Dirección' }
      },
      {
        path: 'materias',
        component: SchoolCoursesComponent,
        resolve: { courses: AssignedCoursesResolver },
        data: { breadcrumb: 'Materias' }
      },
      {
        path: ':courseId',
        component: StudentsCoursesComponent,
        resolve: { students: SchoolUsersResolver },
        data: { breadcrumb: 'Alumnos' }
      },
      {
        path: 'inscripciones',
        component: EnrollmentComponent,
        resolve: { courses: EnrollmentResolver },
        data: { breadcrumb: 'Materias' }
      },
      {
        path: '**',
        component: NotFoundComponent,
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AssignedCoursesResolver, SchoolUsersResolver, EnrollmentResolver, TeachersResolver, AccountsResolver],
})
export class SchoolRoutingModule { }
