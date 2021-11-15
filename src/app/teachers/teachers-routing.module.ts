import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TeachersDashboardComponent } from './components';
import { TeachersComponent } from './containers';

import { ScoresEditComponent } from './components/scores-edit/scores-edit.component';
import { TeacherCoursesComponent } from './components/teacher-courses/teacher-courses.component';
import { TeachersResolver } from '@rds-school/school-courses/resolvers/teachers.resolver';
import { AssignedCoursesResolver } from '@rds-school/school-courses/resolvers/assigned-courses.resolver';


const routes: Routes = [
  {
    path: '',
    component: TeachersComponent,
    children: [
      { path: '', component: TeachersDashboardComponent },
      {
        path: 'calificaciones',
        component: TeacherCoursesComponent,
        data: {
          breadcrumb: 'Calificaciones',
        },
        resolve: { users: AssignedCoursesResolver },
      },
      {
        path: ':courseId',
        component: ScoresEditComponent,
        data: { breadcrumb: ':courseId' },
        resolve: { users: TeachersResolver },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AssignedCoursesResolver, TeachersResolver],
})
export class TeachersRoutingModule { }
