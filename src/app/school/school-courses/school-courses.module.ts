import { NgModule } from '@angular/core';
import { schoolCoursesContainers } from './containers';
import { schoolCoursesComponents } from './components';
import { SharedModule } from '../../shared/shared.module';
import { SchoolCoursesService } from './services/school-courses.service';
import { AssignedCoursesService } from './services/assigned-courses.service';
import { SchoolCoursesRoutingModule } from './school-courses-routing.module';
@NgModule({
  declarations: [...schoolCoursesComponents, ...schoolCoursesContainers],
  providers: [SchoolCoursesService, AssignedCoursesService],
  imports: [
    SharedModule,
    SchoolCoursesRoutingModule
  ]
})
export class SchoolCoursesModule { }
