import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CourseResolver } from './resolvers/course.resolver';
import { CoursesResolver } from './resolvers/courses.resolver';
import { CourseComponent } from './components/course/course.component';
import { CoursesListComponent } from './components/courses-list/courses-list.component';
import { CoursesComponent } from './containers/courses/courses.component';


const routes: Routes = [
  {
    path: '', component: CoursesComponent, data: { breadcrumb: 'Clases' }, children: [
      { path: '', component: CoursesListComponent, data: { breadcrumb: null }, resolve: { courses: CoursesResolver } },
      {
        path: ':courseId', component: CourseComponent, data: { breadcrumb: null }, resolve: { course: CourseResolver }, children: [
          /* { path: '', component: WellcomeComponent }, */
          {
            path: 'students', loadChildren: () => import('../students/students.module').then(m => m.StudentsModule), data: { breadcrumb: 'Alumnos' }
          },
          {
            path: 'teachers', loadChildren: () => import('../teachers/teachers.module').then(m => m.TeachersModule), data: { breadcrumb: 'Profesores' }
          },
          {
            path: 'courseworks', loadChildren: () => import('../course-works/course-works.module').then(m => m.CourseWorksModule), data: { breadcrumb: 'Trabajo de clase' }
          },
          {
            path: 'announcements', loadChildren: () => import('../announcements/announcements.module').then(m => m.AnnouncementsModule), data: { breadcrumb: 'Avisos' }
          },
        ]
      },
    ]
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class CoursesRoutingModule { }
