import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from '@rds-shared/components';
import { SchoolCoursesTableComponent, SchoolStudentsTableComponent } from './components';
import { SchoolCoursesResolver } from './resolvers/school-courses.resolver';
import { SchoolCoursesComponent } from './containers';
import { SchoolStudentsResolver } from './resolvers/school-students.resolver';
import { SchoolComponent } from './containers/school/school.component';
import { SchoolDashboardComponent } from './components/school-dashboard/school-dashboard.component';
import { SchoolClassroomsResolver } from './resolvers/school-classrooms.resolver';
import { SchoolTeachersResolver } from './resolvers/school-teachers.resolver';
import { AccountsResolver } from '../accounts/resolvers/accounts.resolver';
import { SchoolClassroomsComponent } from './containers/school-classrooms/school-classrooms.component';
import { SchoolClassroomListComponent } from './components/school-classroom-list/school-classroom-list.component';

const routes: Routes = [
  {
    path: '',
    component: SchoolComponent,
    children: [
      {
        path: '',
        component: SchoolDashboardComponent,
        data: { breadcrumb: 'Dirección' },
        resolve: { teachers: SchoolClassroomsResolver },
      },
      /*  {
         path: 'm',
         component: SchoolClassroomsComponent,

         data: { breadcrumb: 'Grupos, alumnos y materias' },
         children: [
      {
        path: '',
        component: SchoolClassroomListComponent,
        resolve: { classrooms: SchoolClassroomsResolver },
        outlet: 'classrooms',
      },*/
      {
        //path: '',
        path: 'm',
        component: SchoolCoursesComponent,
        data: { breadcrumb: 'Grupos, alumnos y materias' },
        resolve: { students: SchoolStudentsResolver },
        //outlet: 'courses',
        children: [
          {
            path: '',
            component: SchoolCoursesTableComponent,
            resolve: { courses: SchoolCoursesResolver },
            data: { breadcrumb: 'Materias' },
          },
          {
            path: 'a',
            component: SchoolStudentsTableComponent,
            data: { breadcrumb: 'Alumnos' },

          },
          {
            path: 'g',
            component: SchoolClassroomsComponent,
            data: { breadcrumb: 'Grupos' },
            children: [
              { path: '', component: SchoolClassroomListComponent, },
            ]
          },
          {
            path: '**',
            component: NotFoundComponent,
          }
        ]
      }
    ],
    /* },
  ], */

  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [SchoolCoursesResolver, SchoolStudentsResolver, SchoolClassroomsResolver, SchoolTeachersResolver, AccountsResolver]
})
export class SchoolRoutingModule { }
