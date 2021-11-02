import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AnnouncementResolver } from './services/announcement.resolver';
import { CourseAnnouncementsComponent } from './components/course-announcements/course-announcements.component';

const routes: Routes = [{ path: '', component: CourseAnnouncementsComponent, resolve: { announcements: AnnouncementResolver } }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnnouncementsRoutingModule { }
