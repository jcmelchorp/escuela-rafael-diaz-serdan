import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { EntityDataService, EntityDefinitionService, EntityServices } from '@ngrx/data';

import * as fromStudent from '@rds-store/classroom/student';
import { StudentEntityService } from '@rds-store/classroom/student/student-entity.service';
import { StudentDataService } from '@rds-store/classroom/student/student-data.service';
import * as fromEntity from '@rds-store/config/entity-metadata';

import { SharedModule } from '@rds-shared/shared.module';

import { MaterialModule } from '../../modules/material.module';

import { StudentsRoutingModule } from './students-routing.module';

import { StudentsResolver } from './services/students.resolver';
import { CourseStudentsComponent } from './components/course-students/course-students.component';
import { GuardiansListDialogComponent } from './components/guardians-list-dialog/guardians-list-dialog.component';


@NgModule({
  declarations: [CourseStudentsComponent, GuardiansListDialogComponent],
  exports: [CourseStudentsComponent],
  imports: [
    CommonModule,
    StudentsRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    FontAwesomeModule,
    SharedModule
  ],
  providers: [
    StudentEntityService,
    StudentDataService,
    StudentsResolver,
  ]
})
export class StudentsModule {
  constructor(
    eds: EntityDefinitionService,
    entityServices: EntityServices,
    entityDataService: EntityDataService,
    studentEntityService: StudentEntityService,
    studentDataService: StudentDataService,
  ) {
    entityServices.registerEntityCollectionServices([studentEntityService]);
    eds.registerMetadataMap(fromEntity.entityMetadata);
    entityDataService.registerService(fromStudent.entityCollectionName, studentDataService);
  }
}
