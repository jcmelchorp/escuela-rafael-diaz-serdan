import { NgModule } from '@angular/core';
import { SharedModule } from '@rds-shared/shared.module';
import * as fromAccounts from '@rds-store/accounts';
import * as fromAssignedCourses from '@rds-store/school/assigned-courses';
import * as fromEntity from '@rds-store/config/entity-metadata';
import { TEACHERS_COMPONENTS } from './components';
import { TEACHERS_CONTAINERS } from './containers';
import { TeachersRoutingModule } from './teachers-routing.module';
import { EntityDefinitionService, EntityServices, EntityDataService, } from '@ngrx/data';
import { ScoreService } from './services/score.service';
import { AssignedCoursesDataService } from '@rds-store/school/assigned-courses/assigned-courses-data.service';
import { AssignedCoursesEntityService } from '@rds-store/school/assigned-courses/assigned-courses-entity.service';
import { AccountsDataService } from '@rds-store/accounts/accounts-data.service';
import { AccountsEntityService } from '@rds-store/accounts/accounts-entity.service';
import { AssignedCoursesService } from '@rds-school/school-courses/services/assigned-courses.service';
import { AccountsService } from '../accounts/services/accounts.service';

@NgModule({
  declarations: [...TEACHERS_COMPONENTS, ...TEACHERS_CONTAINERS],
  imports: [SharedModule, TeachersRoutingModule],
  providers: [
    ScoreService,
    AccountsService,
    AssignedCoursesService,
    AssignedCoursesEntityService,
    AssignedCoursesDataService,
    AccountsDataService,
    AccountsEntityService,
  ],
})
export class TeachersModule {
  constructor(
    eds: EntityDefinitionService,
    entityServices: EntityServices,
    entityDataService: EntityDataService,
    assignedCoursesEntityService: AssignedCoursesEntityService,
    assignedCoursesDataService: AssignedCoursesDataService,
    accountsEntityService: AccountsEntityService,
    accountsDataService: AccountsDataService,

  ) {
    eds.registerMetadataMap(fromEntity.entityMetadata);
    entityServices.registerEntityCollectionServices([assignedCoursesEntityService, accountsEntityService]);
    entityDataService.registerService(fromAssignedCourses.entityCollectionName, assignedCoursesDataService);
    entityDataService.registerService(fromAccounts.entityCollectionName, accountsDataService);
  }
}
