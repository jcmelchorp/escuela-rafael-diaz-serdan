import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TeachersResolver } from './services/teachers.resolver';
import { CourseTeachersComponent } from './components/course-teachers/course-teachers.component';

const routes: Routes = [{ path: '', component: CourseTeachersComponent, resolve: { teachers: TeachersResolver } }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeachersRoutingModule { }
