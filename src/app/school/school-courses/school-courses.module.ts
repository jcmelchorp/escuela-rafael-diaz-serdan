import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { schoolCoursesContainers } from './containers';
import { schoolCoursesComponents } from './components';
import { SharedModule } from '../../shared/shared.module';
import { SchoolCoursesService } from './services/school-courses.service';
import { AssignedCoursesService } from './services/assigned-courses.service';
import { SchoolCoursesRoutingModule } from './school-courses-routing.module';
import { StudentsCoursesComponent } from './containers/students-courses/students-courses.component';



@NgModule({
  declarations: [...schoolCoursesComponents, ...schoolCoursesContainers, StudentsCoursesComponent],
  providers: [SchoolCoursesService, AssignedCoursesService,],
  imports: [
    SharedModule,
    SchoolCoursesRoutingModule
  ]
})
export class SchoolCoursesModule { }
