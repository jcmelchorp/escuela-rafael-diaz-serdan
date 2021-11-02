import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { EntityDefinitionService, EntityServices, EntityDataService } from '@ngrx/data';

import { SharedModule } from '@rds-shared/shared.module';

import * as fromCourse from '@rds-store/classroom/course';
import * as fromUserProfile from '@rds-store/classroom/user-profile';
import * as fromEntity from '@rds-store/config/entity-metadata';
import { CourseDataService } from '@rds-store/classroom/course/course-data.service';
import { CourseEntityService } from '@rds-store/classroom/course/course-entity.service';
import { UserProfileDataService } from '@rds-store/classroom/user-profile/user-profile-data.service';
import { UserProfileEntityService } from '@rds-store/classroom/user-profile/user-profile-entity.service';
import { GuardianDataService } from '@rds-store/classroom/guardian/guardian-data.service';
import { GuardianEntityService } from '@rds-store/classroom/guardian/guardian-entity.service';

import { UserProfilesService } from '@rds-classroom/user-profiles/services/user-profiles.service';
import { AnnouncementsModule } from '@rds-classroom/announcements/announcements.module';
import { CourseWorksModule } from '@rds-classroom/course-works/course-works.module';
import { StudentsModule } from '@rds-classroom/students/students.module';
import { TeachersModule } from '@rds-classroom/teachers/teachers.module';

import { MaterialModule } from '../../modules/material.module';

import { CoursesRoutingModule } from './courses-routing.module';

import { CourseResolver } from './resolvers/course.resolver';
import { CoursesResolver } from './resolvers/courses.resolver';
import { GuardiansResolver } from './resolvers/guardians.resolver';
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
    CommonModule,
    CoursesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    FontAwesomeModule,
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
