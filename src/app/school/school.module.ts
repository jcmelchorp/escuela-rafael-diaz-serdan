import { NgModule } from '@angular/core';
import { EntityDefinitionService, EntityServices, EntityDataService } from '@ngrx/data';


import { SharedModule } from '@rds-shared/shared.module';
import { AccountsDomainDataService } from '@rds-store/accounts-domain/accounts-domain-data.service';
import { AccountsDomainEntityService } from '@rds-store/accounts-domain/accounts-domain-entity.service';
import { AccountsDataService } from '@rds-store/accounts/accounts-data.service';
import { AccountsEntityService } from '@rds-store/accounts/accounts-entity.service';

import * as fromEnrollments from '@rds-store/school/enrollments';
import * as fromAccounts from '@rds-store/accounts';
import * as fromAccountsDomain from '@rds-store/accounts-domain';
import * as fromSchoolCourses from '@rds-store/school/school-courses';
import * as fromAssignedCourses from '@rds-store/school/assigned-courses';
import * as fromEntity from '@rds-store/config/entity-metadata';

import { schoolComponents } from './components';
import { schoolContainers } from './containers';
import { SchoolRoutingModule } from './school-routing.module';
import { EnrollmentsService } from './services/enrollments.service';
import { AccountsDomainService } from '../accounts/services/accounts-domain.service';
import { AccountsService } from '../accounts/services/accounts.service';
import { SchoolCoursesService } from './services/school-courses.service';
import { SchoolCoursesEntityService } from '@rds-store/school/school-courses/school-courses-entity.service';
import { SchoolCoursesDataService } from '@rds-store/school/school-courses/school-courses-data.service';
import { EnrollmentsEntityService } from '@rds-store/school/enrollments/enrollments-entity.service';
import { EnrollmentsDataService } from '@rds-store/school/enrollments/enrollments-data.service';
import { AssignedCoursesService } from './services/assigned-courses.service';
import { AssignedCoursesEntityService } from '@rds-store/school/assigned-courses/assigned-courses-entity.service';
import { AssignedCoursesDataService } from '@rds-store/school/assigned-courses/assigned-courses-data.service';
@NgModule({
  declarations: [...schoolComponents, ...schoolContainers,
  ],
  imports: [SharedModule, SchoolRoutingModule],
  providers: [
    EnrollmentsService,
    SchoolCoursesService,
    AssignedCoursesService,
    AccountsDomainService,
    AccountsService,
    SchoolCoursesEntityService,
    SchoolCoursesDataService,
    AccountsDataService,
    AccountsEntityService,
    AccountsDomainDataService,
    AccountsDomainEntityService,
    EnrollmentsEntityService,
    EnrollmentsDataService,
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
    enrollmentsEntityService: EnrollmentsEntityService,
    enrollmentsDataService: EnrollmentsDataService,
    assignedCoursesEntityService: AssignedCoursesEntityService,
    assignedCoursesDataService: AssignedCoursesDataService,
  ) {
    eds.registerMetadataMap(fromEntity.entityMetadata);
    entityServices.registerEntityCollectionServices([
      schoolCoursesEntityService, accountsDomainEntityService, accountsEntityService, enrollmentsEntityService, assignedCoursesEntityService
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
    entityDataService.registerService(
      fromEnrollments.entityCollectionName,
      enrollmentsDataService
    );
  }
}
