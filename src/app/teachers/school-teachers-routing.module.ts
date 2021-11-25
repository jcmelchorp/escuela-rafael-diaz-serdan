import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TeachersDashboardComponent } from './components';
import { TeachersComponent } from './containers';

import { ScoresEditComponent } from './components/scores-edit/scores-edit.component';
import { TeacherCoursesComponent } from './components/teacher-courses/teacher-courses.component';
import { SchoolCoursesResolver } from '@rds-school/resolvers/school-courses.resolver';
import { SchoolTeachersResolver } from '@rds-school/resolvers/school-teachers.resolver';

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
        resolve: { users: SchoolCoursesResolver },
      },
      {
        path: ':courseId',
        component: ScoresEditComponent,
        data: { breadcrumb: ':courseId' },
        resolve: { users: SchoolTeachersResolver },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [SchoolCoursesResolver, SchoolTeachersResolver],
})
export class SchoolTeachersRoutingModule { }
