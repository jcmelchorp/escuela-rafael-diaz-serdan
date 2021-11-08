import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SchoolCoursesResolver } from './school-courses/resolvers/school-courses.resolver';
import { SchoolComponent } from './school.component';
import { SchoolDashboardComponent } from './school-dashboard/school-dashboard.component';
import { SchoolUsersResolver } from './school-courses/resolvers/school-users.resolver';
import { EnrollmentComponent } from './enrollments/containers/enrollment/enrollment.component';
import { SchoolCoursesComponent } from './school-courses/containers/school-courses/school-courses.component';
import { EnrollmentResolver } from './enrollments/resolvers/enrollment.resolver';
import { NotFoundComponent } from '@rds-shared/components';
const routes: Routes = [
  {
    path: '',
    component: SchoolComponent,
    children: [
      {
        path: '',
        component: SchoolDashboardComponent,
        data: { breadcrumb: 'Dirección' }
      },
      {
        path: 'materias',
        component: SchoolCoursesComponent,
        resolve: { courses: SchoolCoursesResolver },
        data: { breadcrumb: 'Materias' }
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
  providers: [SchoolUsersResolver, SchoolCoursesResolver, EnrollmentResolver],
})
export class SchoolRoutingModule { }
