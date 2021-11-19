import { NgModule } from '@angular/core';
import * as fromAccounts from '@rds-store/accounts';
import * as fromAccountsDomain from '@rds-store/accounts-domain';
import * as fromSchoolCourses from '@rds-store/school/school-courses';
import * as fromSchoolTeachers from '@rds-store/school/school-teachers';
import * as fromSchoolStudents from '@rds-store/school/school-students';
import * as fromAssignedCourses from '@rds-store/school/assigned-courses';
import * as fromEntity from '@rds-store/config/entity-metadata';
import { SchoolRoutingModule } from './school-routing.module';
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
import { SchoolTeachersDataService } from '@rds-store/school/school-teachers/school-teacher-data.service';
import { SchoolTeachersEntityService } from '@rds-store/school/school-teachers/school-teacher-entity.service';
import { SchoolStudentsDataService } from '@rds-store/school/school-students/school-students-data.service';
import { SchoolStudentsEntityService } from '@rds-store/school/school-students/school-students-entity.service';
import { SCHOOL_COMPONENTS } from './components';
import { SCHOOL_CONTAINERS } from './containers';
import { SCHOOL_SERVICES } from './services';
import { ACCOUNTS_SERVICES } from '@rds-accounts/services';
@NgModule({
  declarations: [...SCHOOL_COMPONENTS, ...SCHOOL_CONTAINERS],
  imports: [SharedModule, SchoolRoutingModule],
  providers: [
    ...SCHOOL_SERVICES,
    ...ACCOUNTS_SERVICES,
    AssignedCoursesEntityService,
    AssignedCoursesDataService,
    SchoolStudentsEntityService,
    SchoolStudentsDataService,
    AccountsDataService,
    AccountsEntityService,
    AccountsDomainDataService,
    AccountsDomainEntityService,

  ],
})
export class SchoolModule {
  constructor(
    eds: EntityDefinitionService,
    entityServices: EntityServices,
    entityDataService: EntityDataService,
    schoolStudentsDataService: SchoolStudentsDataService,
    schoolStudentsEntityService: SchoolStudentsEntityService,
    assignedCoursesDataService: AssignedCoursesDataService,
    assignedCoursesEntityService: AssignedCoursesEntityService,
    accountsDomainEntityService: AccountsDomainEntityService,
    accountsDomainDataService: AccountsDomainDataService,
    accountsEntityService: AccountsEntityService,
    accountsDataService: AccountsDataService,
  ) {
    eds.registerMetadataMap(fromEntity.entityMetadata);
    entityServices.registerEntityCollectionServices([
      schoolStudentsEntityService, accountsDomainEntityService, accountsEntityService, assignedCoursesEntityService
    ]);
    entityDataService.registerService(
      fromSchoolStudents.entityCollectionName,
      schoolStudentsDataService
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
