import { NgModule } from '@angular/core';
import {
  EntityDefinitionService,
  EntityServices,
  EntityDataService,
} from '@ngrx/data';

import * as fromEntity from '@rds-store/config/entity-metadata';
import * as fromTeacher from '@rds-store/classroom/teacher';
import { TeacherDataService } from '@rds-store/classroom/teacher/teacher-data.service';
import { TeacherEntityService } from '@rds-store/classroom/teacher/teacher-entity.service';

import { TeachersRoutingModule } from './teachers-routing.module';

import { TeachersResolver } from './services/teachers.resolver';
import { TeachersService } from './services/teachers.service';
import { CourseTeachersComponent } from './components/course-teachers/course-teachers.component';
import { SharedModule } from '@rds-shared/shared.module';

@NgModule({
  declarations: [CourseTeachersComponent],
  exports: [CourseTeachersComponent],
  imports: [
    SharedModule,
    TeachersRoutingModule,
  ],
  providers: [
    TeachersService,
    TeacherEntityService,
    TeacherDataService,
    TeachersResolver,
  ],
})
export class TeachersModule {
  constructor(
    eds: EntityDefinitionService,
    entityServices: EntityServices,
    teacherEntityService: TeacherEntityService,
    entityDataService: EntityDataService,
    teacherDataService: TeacherDataService
  ) {
    entityServices.registerEntityCollectionServices([teacherEntityService]);
    eds.registerMetadataMap(fromEntity.entityMetadata);
    entityDataService.registerService(
      fromTeacher.entityCollectionName,
      teacherDataService
    );
  }
}
