import { NgModule } from '@angular/core';
import { SharedModule } from '@rds-shared/shared.module';
import * as fromAccounts from '@rds-store/accounts';
import * as fromSchoolCourses from '@rds-store/school/school-courses';
import * as fromSchoolTeachers from '@rds-store/school/school-teachers'
import * as fromEntity from '@rds-store/config/entity-metadata';
import { TEACHERS_COMPONENTS } from './components';
import { TEACHERS_CONTAINERS } from './containers';
import { SchoolTeachersRoutingModule } from './school-teachers-routing.module';
import { EntityDefinitionService, EntityServices, EntityDataService, } from '@ngrx/data';
import { ScoreService } from './services/score.service';

import { AccountsDataService } from '@rds-store/accounts/accounts-data.service';
import { AccountsEntityService } from '@rds-store/accounts/accounts-entity.service';
import { AccountsService } from '../accounts/services/accounts.service';
import { SchoolTeachersDataService } from '@rds-store/school/school-teachers/school-teacher-data.service';
import { SchoolTeachersEntityService } from '@rds-store/school/school-teachers/school-teacher-entity.service';
import { SchoolTeachersService } from '../school/services/school-tearchers.service';
import { SchoolCoursesService } from '@rds-school/services/school-courses.service';
import { SchoolCoursesDataService } from '@rds-store/school/school-courses/school-courses-data.service';
import { SchoolCoursesEntityService } from '@rds-store/school/school-courses/school-courses-entity.service';

@NgModule({
  declarations: [...TEACHERS_COMPONENTS, ...TEACHERS_CONTAINERS],
  imports: [SharedModule, SchoolTeachersRoutingModule],
  providers: [
    ScoreService,
    AccountsService,
    SchoolCoursesService,
    SchoolTeachersService,
    SchoolCoursesEntityService,
    SchoolCoursesDataService,
    AccountsDataService,
    AccountsEntityService,
    SchoolTeachersEntityService,
    SchoolTeachersDataService,
  ],
})
export class SchoolTeachersModule {
  constructor(
    eds: EntityDefinitionService,
    entityServices: EntityServices,
    entityDataService: EntityDataService,
    schoolCoursesEntityService: SchoolCoursesEntityService,
    schoolCoursesDataService: SchoolCoursesDataService,
    accountsEntityService: AccountsEntityService,
    accountsDataService: AccountsDataService,
    schoolTeachersDataService: SchoolTeachersDataService,
    schoolTeachersEntityService: SchoolTeachersEntityService,
  ) {
    eds.registerMetadataMap(fromEntity.entityMetadata);
    entityServices.registerEntityCollectionServices([
      schoolTeachersEntityService,
      schoolCoursesEntityService,
      accountsEntityService
    ]);
    entityDataService.registerService(fromSchoolCourses.entityCollectionName, schoolCoursesDataService);
    entityDataService.registerService(fromAccounts.entityCollectionName, accountsDataService);
    entityDataService.registerService(fromSchoolTeachers.entityCollectionName, schoolTeachersDataService);

  }
}
