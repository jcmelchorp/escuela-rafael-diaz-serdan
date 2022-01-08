import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from '@rds-shared/components';
import { SchoolCoursesResolver } from './resolvers/school-courses.resolver';
import { SchoolStudentsResolver } from './resolvers/school-students.resolver';
import { SchoolComponent } from './containers/school/school.component';
import { SchoolDashboardComponent } from './components/school-dashboard/school-dashboard.component';
import { SchoolClassroomsResolver } from './resolvers/school-classrooms.resolver';
import { SchoolTeachersResolver } from './resolvers/school-teachers.resolver';
import { SchoolClassroomsComponent } from './containers/school-classrooms/school-classrooms.component';
import { SchoolCoursesTableComponent } from './components';
import { SchoolCoursesComponent } from './containers';
import { SchoolPlaceholderComponent } from './components/school-placeholder/school-placeholder.component';
import { SchoolGraduatesResolver } from './resolvers/school-graduates.resolver';
import { AccountsResolver } from '../accounts/resolvers/accounts.resolver';

const routes: Routes = [
  {
    path: '',
    component: SchoolComponent,
    data: { breadcrumb: 'Dirección' },
    children: [
      {
        path: '',
        component: SchoolPlaceholderComponent,
      },
      {
        //path: '',
        path: 'i',
        component: SchoolClassroomsComponent,
        data: { breadcrumb: 'Inscripciones' },
        resolve: { classrooms: SchoolClassroomsResolver, courses: SchoolCoursesResolver, accounts: AccountsResolver },
      },
      {
        //path: '',
        path: 'm',
        component: SchoolCoursesTableComponent,
        data: { breadcrumb: 'Materias' },
        resolve: { courses: SchoolCoursesResolver, teachers: SchoolTeachersResolver },
        /* children: [
          { path: '', component: SchoolCoursesTableComponent },
        ] */
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
