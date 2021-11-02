import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router';

import { ClassroomComponent } from './classroom.component';

const routes: Routes = [
  { path: '', component: ClassroomComponent, data: { breadcrumb: null } },
  {
    path: 'clases', loadChildren: () => import('./courses/courses.module').then(m => m.CoursesModule), data: { breadcrumb: null }
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClassroomRoutingModule { }
