import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssignedCoursesResolver } from './school-courses/resolvers/assigned-courses.resolver';
import { SchoolComponent } from './school.component';
import { SchoolDashboardComponent } from './school-dashboard/school-dashboard.component';
import { SchoolUsersResolver } from './school-courses/resolvers/school-users.resolver';
import { SchoolCoursesComponent } from './school-courses/containers/school-courses/school-courses.component';
import { NotFoundComponent } from '@rds-shared/components';
import { } from './school-courses/containers/students-courses/students-courses.component';
import { SchoolTeachersResolver } from './school-courses/resolvers/school-teachers.resolver';

import { SchoolCoursesGroupedByTableComponent } from './school-courses/components/school-courses-grouped-by-table/school-courses-grouped-by-table.component';
import { AddStudentsCoursesComponent } from './school-courses/components/add-students-courses/add-students-courses.component';
const routes: Routes = [
  {
    path: '',
    component: SchoolComponent,
    resolve: { teachers: SchoolTeachersResolver },
    children: [
      {
        path: '',
        component: SchoolDashboardComponent,
        data: { breadcrumb: 'Dirección' }
      },
      {
        path: 'materias',
        component: SchoolCoursesComponent,
        resolve: { courses: AssignedCoursesResolver },
        data: { breadcrumb: 'Materias' },

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
  providers: [AssignedCoursesResolver, SchoolTeachersResolver],
})
export class SchoolRoutingModule { }
