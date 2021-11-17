import { NgModule } from '@angular/core';
import { schoolCoursesContainers } from './containers';
import { schoolCoursesComponents } from './components';
import { SharedModule } from '../../shared/shared.module';
import { SchoolCoursesService } from './services/school-courses.service';
import { AssignedCoursesService } from './services/assigned-courses.service';
import { SchoolCoursesRoutingModule } from './school-courses-routing.module';
import { SchoolCoursesGroupedByTableComponent } from './components/school-courses-grouped-by-table/school-courses-grouped-by-table.component';
@NgModule({
  declarations: [...schoolCoursesComponents, ...schoolCoursesContainers, SchoolCoursesGroupedByTableComponent],
  providers: [SchoolCoursesService, AssignedCoursesService],
  imports: [
    SharedModule,
    SchoolCoursesRoutingModule
  ]
})
export class SchoolCoursesModule { }
