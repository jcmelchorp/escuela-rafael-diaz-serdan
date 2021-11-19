import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from '@rds-shared/components';
import { SchoolCoursesTableComponent, SchoolStudentsTableComponent } from './components';
import { AssignedCoursesResolver } from './resolvers/assigned-courses.resolver';
import { SchoolCoursesComponent } from './containers';
import { SchoolStudentsResolver } from './resolvers/school-students.resolver';
import { SchoolComponent } from './containers/school/school.component';
import { SchoolDashboardComponent } from './components/school-dashboard/school-dashboard.component';

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
        path: 'm',
        component: SchoolCoursesComponent,
        children: [
          {
            path: 'c',
            component: SchoolCoursesTableComponent,
            resolve: { courses: AssignedCoursesResolver },
            data: { breadcrumb: 'Materias' },

          },
          {
            path: 'a',
            component: SchoolStudentsTableComponent,
            resolve: { students: SchoolStudentsResolver },
            data: { breadcrumb: 'Alumnos' },

          },
        ]
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
  providers: [AssignedCoursesResolver, SchoolStudentsResolver]
})
export class SchoolRoutingModule { }
