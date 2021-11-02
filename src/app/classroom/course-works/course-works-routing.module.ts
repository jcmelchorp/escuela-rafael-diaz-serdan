import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CourseWorksResolver } from './services/course-works.resolver';
import { StudentSubmissionsResolver } from './services/student-submissions.resolver';
import { TopicsResolver } from './services/topics.resolver';
import { CourseWorkComponent } from './components/course-work/course-work.component';

const routes: Routes = [
  {
    path: '', component: CourseWorkComponent,
    resolve: {
      courseworks: CourseWorksResolver,
      topics: TopicsResolver,
    }
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseWorksRoutingModule { }
