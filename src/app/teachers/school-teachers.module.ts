import { NgModule } from '@angular/core';
import { SharedModule } from '@rds-shared/shared.module';
import * as fromAccounts from '@rds-store/accounts';
import * as fromAssignedCourses from '@rds-store/school/assigned-courses';
import * as fromSchoolTeachers from '@rds-store/school/school-teachers'
import * as fromEntity from '@rds-store/config/entity-metadata';
import { TEACHERS_COMPONENTS } from './components';
import { TEACHERS_CONTAINERS } from './containers';
import { SchoolTeachersRoutingModule } from './school-teachers-routing.module';
import { EntityDefinitionService, EntityServices, EntityDataService, } from '@ngrx/data';
import { ScoreService } from './services/score.service';
import { AssignedCoursesDataService } from '@rds-store/school/assigned-courses/assigned-courses-data.service';
import { AssignedCoursesEntityService } from '@rds-store/school/assigned-courses/assigned-courses-entity.service';
import { AccountsDataService } from '@rds-store/accounts/accounts-data.service';
import { AccountsEntityService } from '@rds-store/accounts/accounts-entity.service';
import { AccountsService } from '../accounts/services/accounts.service';
import { SchoolTeachersDataService } from '@rds-store/school/school-teachers/school-teacher-data.service';
import { SchoolTeachersEntityService } from '@rds-store/school/school-teachers/school-teacher-entity.service';
import { SchoolTeachersService } from '../school/services/school-tearchers.service';
import { AssignedCoursesService } from '@rds-school/services/assigned-courses.service';

@NgModule({
  declarations: [...TEACHERS_COMPONENTS, ...TEACHERS_CONTAINERS],
  imports: [SharedModule, SchoolTeachersRoutingModule],
  providers: [
    ScoreService,
    AccountsService,
    AssignedCoursesService,
    SchoolTeachersService,
    AssignedCoursesEntityService,
    AssignedCoursesDataService,
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
    assignedCoursesEntityService: AssignedCoursesEntityService,
    assignedCoursesDataService: AssignedCoursesDataService,
    accountsEntityService: AccountsEntityService,
    accountsDataService: AccountsDataService,
    schoolTeachersDataService: SchoolTeachersDataService,
    schoolTeachersEntityService: SchoolTeachersEntityService,
  ) {
    eds.registerMetadataMap(fromEntity.entityMetadata);
    entityServices.registerEntityCollectionServices([
      schoolTeachersEntityService,
      assignedCoursesEntityService,
      accountsEntityService
    ]);
    entityDataService.registerService(fromAssignedCourses.entityCollectionName, assignedCoursesDataService);
    entityDataService.registerService(fromAccounts.entityCollectionName, accountsDataService);
    entityDataService.registerService(fromSchoolTeachers.entityCollectionName, schoolTeachersDataService);

  }
}
