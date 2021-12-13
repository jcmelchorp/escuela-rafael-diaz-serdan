import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from '@rds-shared/components';
import { SchoolCoursesResolver } from './resolvers/school-courses.resolver';
import { SchoolStudentsResolver } from './resolvers/school-students.resolver';
import { SchoolComponent } from './containers/school/school.component';
import { SchoolDashboardComponent } from './components/school-dashboard/school-dashboard.component';
import { SchoolClassroomsResolver } from './resolvers/school-classrooms.resolver';
import { SchoolTeachersResolver } from './resolvers/school-teachers.resolver';
import { AccountsResolver } from '../accounts/resolvers/accounts.resolver';
import { SchoolClassroomsComponent } from './containers/school-classrooms/school-classrooms.component';

const routes: Routes = [
  {
    path: '',
    component: SchoolComponent,
    resolve: { teachers: SchoolTeachersResolver },
    children: [
      {
        path: '',
        component: SchoolDashboardComponent,
        data: { breadcrumb: 'Dirección' },
        resolve: { classrooms: SchoolClassroomsResolver, courses: SchoolCoursesResolver },
      },
      {
        //path: '',
        path: 'a',
        component: SchoolClassroomsComponent,
        data: { breadcrumb: 'Grupos, alumnos y materias' },
        resolve: { students: SchoolStudentsResolver },
      },
      {
        path: '**',
        component: NotFoundComponent,
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [SchoolCoursesResolver, SchoolStudentsResolver, SchoolClassroomsResolver, SchoolTeachersResolver, AccountsResolver]
})
export class SchoolRoutingModule { }
