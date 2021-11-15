import { NgModule } from '@angular/core';
import * as fromAccounts from '@rds-store/accounts';
import * as fromAccountsDomain from '@rds-store/accounts-domain';
import * as fromSchoolCourses from '@rds-store/school/school-courses';
import * as fromAssignedCourses from '@rds-store/school/assigned-courses';
import * as fromEntity from '@rds-store/config/entity-metadata';
import { SchoolRoutingModule } from './school-routing.module';
import { SchoolComponent } from './school.component';
import { SchoolCoursesModule } from './school-courses/school-courses.module';
import { SharedModule } from '@rds-shared/shared.module';
import { SchoolCoursesEntityService } from '@rds-store/school/school-courses/school-courses-entity.service';
import { SchoolCoursesDataService } from '@rds-store/school/school-courses/school-courses-data.service';
import { AccountsDataService } from '@rds-store/accounts/accounts-data.service';
import { AccountsEntityService } from '@rds-store/accounts/accounts-entity.service';
import { AccountsDomainService } from '@rds-accounts/services/accounts-domain.service';
import { AccountsService } from '@rds-accounts/services/accounts.service';
import { EntityDefinitionService, EntityServices, EntityDataService } from '@ngrx/data';
import { AccountsDomainDataService } from '@rds-store/accounts-domain/accounts-domain-data.service';
import { AccountsDomainEntityService } from '@rds-store/accounts-domain/accounts-domain-entity.service';
import { AssignedCoursesDataService } from '@rds-store/school/assigned-courses/assigned-courses-data.service';
import { AssignedCoursesEntityService } from '@rds-store/school/assigned-courses/assigned-courses-entity.service';
import { SchoolDashboardComponent } from './school-dashboard/school-dashboard.component';
@NgModule({
  declarations: [SchoolComponent, SchoolDashboardComponent],
  imports: [SharedModule, SchoolRoutingModule, SchoolCoursesModule],
  exports: [SharedModule],
  providers: [
    AccountsDomainService,
    AccountsService,
    SchoolCoursesEntityService,
    SchoolCoursesDataService,
    AccountsDataService,
    AccountsEntityService,
    AccountsDomainDataService,
    AccountsDomainEntityService,
    AssignedCoursesEntityService,
    AssignedCoursesDataService,
  ],
})
export class SchoolModule {
  constructor(
    eds: EntityDefinitionService,
    entityServices: EntityServices,
    entityDataService: EntityDataService,
    schoolCoursesEntityService: SchoolCoursesEntityService,
    schoolCoursesDataService: SchoolCoursesDataService,
    accountsDomainEntityService: AccountsDomainEntityService,
    accountsDomainDataService: AccountsDomainDataService,
    accountsEntityService: AccountsEntityService,
    accountsDataService: AccountsDataService,
    assignedCoursesEntityService: AssignedCoursesEntityService,
    assignedCoursesDataService: AssignedCoursesDataService,
  ) {
    eds.registerMetadataMap(fromEntity.entityMetadata);
    entityServices.registerEntityCollectionServices([
      schoolCoursesEntityService, accountsDomainEntityService, accountsEntityService, assignedCoursesEntityService
    ]);
    entityDataService.registerService(
      fromSchoolCourses.entityCollectionName,
      schoolCoursesDataService
    );
    entityDataService.registerService(
      fromAssignedCourses.entityCollectionName,
      assignedCoursesDataService
    );
    entityDataService.registerService(
      fromAccounts.entityCollectionName,
      accountsDataService
    );
    entityDataService.registerService(
      fromAccountsDomain.entityCollectionName,
      accountsDomainDataService
    );
  }
}
