import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StudentsResolver } from './services/students.resolver';
import { CourseStudentsComponent } from './components/course-students/course-students.component';


const routes: Routes = [{ path: '', component: CourseStudentsComponent, resolve: { students: StudentsResolver } }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentsRoutingModule { }
