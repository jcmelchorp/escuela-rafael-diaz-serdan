import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from '@rds-shared/components';
import { SchoolCoursesTableComponent, SchoolStudentsTableComponent } from './components';
import { SchoolCoursesResolver } from './resolvers/school-courses.resolver';
import { SchoolClassroomsComponent, SchoolCoursesComponent } from './containers';
import { SchoolStudentsResolver } from './resolvers/school-students.resolver';
import { SchoolComponent } from './containers/school/school.component';
import { SchoolDashboardComponent } from './components/school-dashboard/school-dashboard.component';
import { SchoolClassroomsResolver } from './resolvers/school-classrooms.resolver';
import { SchoolClassroomListComponent } from './components/school-classroom-list/school-classroom-list.component';
import { SchoolTeachersResolver } from './resolvers/school-teachers.resolver';

const routes: Routes = [
  {
    path: '',
    component: SchoolComponent,
    children: [
      {
        path: '',
        component: SchoolDashboardComponent,
        data: { breadcrumb: 'Dirección' },
        resolve: { classrooms: SchoolClassroomsResolver },
      },
      /*  {
         path: 'm',
         component: SchoolClassroomsComponent,
         resolve: { teachers: SchoolTeachersResolver },
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
        resolve: { teachers: SchoolTeachersResolver },
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
            resolve: { students: SchoolStudentsResolver },
            data: { breadcrumb: 'Alumnos' },
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
  providers: [SchoolCoursesResolver, SchoolStudentsResolver, SchoolClassroomsResolver, SchoolTeachersResolver]
})
export class SchoolRoutingModule { }
