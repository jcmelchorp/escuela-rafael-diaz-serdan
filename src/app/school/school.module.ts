import { NgModule } from '@angular/core';
import * as fromAccounts from '@rds-store/accounts';
import * as fromAccountsDomain from '@rds-store/accounts-domain';
import * as fromSchoolCourses from '@rds-store/school/school-courses';
import * as fromSchoolTeachers from '@rds-store/school/school-teachers';

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
import { AdminGuard } from '@rds-accounts/guards/admin.guard';
import { AuthGuard } from '@rds-auth/guards/auth.guard';
import { AccountsResolver } from '@rds-accounts/resolvers/accounts.resolver';
import { AssignedCoursesService } from './school-courses/services/assigned-courses.service';
import { SchoolCoursesService } from './school-courses/services/school-courses.service';
import { SchoolTeachersDataService } from '@rds-store/school/school-teachers/school-teacher-data.service';
import { SchoolTeachersEntityService } from '@rds-store/school/school-teachers/school-teacher-entity.service';
import { SchoolTeachersService } from '@rds-school/school-courses/services/school-tearchers.service';
@NgModule({
  declarations: [SchoolComponent, SchoolDashboardComponent],
  imports: [SharedModule, SchoolRoutingModule, SchoolCoursesModule],
  exports: [SharedModule],
  providers: [
    AccountsResolver,
    AccountsDomainService,
    AccountsService,
    SchoolCoursesService,
    SchoolTeachersService,
    AssignedCoursesService,
    SchoolCoursesEntityService,
    SchoolCoursesDataService,
    SchoolTeachersEntityService,
    SchoolTeachersDataService,
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
    schoolTeachersDataService: SchoolTeachersDataService,
    schoolTeachersEntityService: SchoolTeachersEntityService,
    accountsDomainEntityService: AccountsDomainEntityService,
    accountsDomainDataService: AccountsDomainDataService,
    accountsEntityService: AccountsEntityService,
    accountsDataService: AccountsDataService,
    assignedCoursesEntityService: AssignedCoursesEntityService,
    assignedCoursesDataService: AssignedCoursesDataService,
  ) {
    eds.registerMetadataMap(fromEntity.entityMetadata);
    entityServices.registerEntityCollectionServices([
      schoolTeachersEntityService, schoolCoursesEntityService, accountsDomainEntityService, accountsEntityService, assignedCoursesEntityService
    ]);
    entityDataService.registerService(
      fromSchoolCourses.entityCollectionName,
      schoolCoursesDataService
    );
    entityDataService.registerService(
      fromSchoolTeachers.entityCollectionName,
      schoolTeachersDataService
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
