import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { EntityDefinitionService, EntityServices, EntityDataService } from '@ngrx/data';

import * as fromGuardian from '@rds-store/classroom/guardian';
import * as fromUserProfile from '@rds-store/classroom/user-profile';
import * as fromEntity from '@rds-store/config/entity-metadata';
import { CourseDataService } from '@rds-store/classroom/course/course-data.service';
import { CourseEntityService } from '@rds-store/classroom/course/course-entity.service';
import { GuardianDataService } from '@rds-store/classroom/guardian/guardian-data.service';
import { GuardianEntityService } from '@rds-store/classroom/guardian/guardian-entity.service';
import { UserProfileDataService } from '@rds-store/classroom/user-profile/user-profile-data.service';
import { UserProfileEntityService } from '@rds-store/classroom/user-profile/user-profile-entity.service';

import { MaterialModule } from '../../modules/material.module';
import { CoursesService } from '../courses/services/courses.service';

import { UserProfilesRoutingModule } from './user-profiles-routing.module';

import { StudentCoursesResolver } from './services/student-courses.resolver';
import { UserProfileResolver } from './services/user-profile.resolver';
import { UserProfilesService } from './services/user-profiles.service';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { ProfileUserComponent } from './components/profile-user/profile-user.component';
import { UserProfileComponent } from './containers/user-profile/user-profile.component';

@NgModule({
  declarations: [
    EditProfileComponent,
    ProfileUserComponent,
    UserProfileComponent,
  ],
  imports: [
    CommonModule,
    UserProfilesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    FontAwesomeModule,
  ],
  providers: [
    UserProfilesService,
    UserProfileResolver,
    UserProfileEntityService,
    UserProfileDataService,
    GuardianEntityService,
    GuardianDataService,
    StudentCoursesResolver
  ]
})
export class UserProfilesModule {
  constructor(
    eds: EntityDefinitionService,
    entityServices: EntityServices,
    entityDataService: EntityDataService,
    userProfileEntityService: UserProfileEntityService,
    userProfileDataService: UserProfileDataService,
    guardianEntityService: GuardianEntityService,
    guardianDataService: GuardianDataService,
    /* courseEntityService: CourseEntityService,
    courseDataService: CourseDataService, */
  ) {
    entityServices.registerEntityCollectionServices([
      userProfileEntityService,
      /* courseEntityService, */
      guardianEntityService,

    ]);
    eds.registerMetadataMap(fromEntity.entityMetadata);
    /* entityDataService.registerService(fromCourse.entityCollectionName, courseDataService); */
    entityDataService.registerService(fromGuardian.entityCollectionName, guardianDataService);
    entityDataService.registerService(fromUserProfile.entityCollectionName, userProfileDataService);
  }
}
