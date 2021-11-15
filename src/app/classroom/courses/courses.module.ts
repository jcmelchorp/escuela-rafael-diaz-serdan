import { NgModule } from '@angular/core';
import { EntityDefinitionService, EntityServices, EntityDataService } from '@ngrx/data';
import { SharedModule } from '@rds-shared/shared.module';
import * as fromCourse from '@rds-store/classroom/course';
import * as fromEntity from '@rds-store/config/entity-metadata';
import { CourseDataService } from '@rds-store/classroom/course/course-data.service';
import { CourseEntityService } from '@rds-store/classroom/course/course-entity.service';
import { CoursesRoutingModule } from './courses-routing.module';
import { CourseResolver } from './resolvers/course.resolver';
import { CoursesResolver } from './resolvers/courses.resolver';
import { CoursesService } from './services/courses.service';
import { CourseDialogComponent } from './components/course-dialog/course-dialog.component';
import { CourseUserDialogComponent } from './components/course-user-dialog/course-user-dialog.component';
import { CourseComponent } from './components/course/course.component';
import { CoursesListComponent } from './components/courses-list/courses-list.component';
import { CoursesComponent } from './containers/courses/courses.component';

@NgModule({
  declarations: [
    CoursesComponent,
    CourseDialogComponent,
    CourseComponent,
    CoursesListComponent,
    CourseUserDialogComponent
  ],
  exports: [CoursesListComponent, CourseDialogComponent],
  imports: [
    SharedModule,
    CoursesRoutingModule,
  ],
  providers: [
    CoursesService,
    CourseEntityService,
    CourseDataService,
    CoursesResolver,
    CourseResolver,
  ]
})
export class CoursesModule {

  constructor(
    eds: EntityDefinitionService,
    entityServices: EntityServices,
    entityDataService: EntityDataService,
    // custom collection services
    courseEntityService: CourseEntityService,
    courseDataService: CourseDataService,
  ) {
    entityServices.registerEntityCollectionServices([courseEntityService]);
    eds.registerMetadataMap(fromEntity.entityMetadata);
    entityDataService.registerService(fromCourse.entityCollectionName, courseDataService);
  }
}
