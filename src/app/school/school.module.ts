import { NgModule } from '@angular/core';
import * as fromAccounts from '@rds-store/accounts';
import * as fromAccountsDomain from '@rds-store/accounts-domain';
import * as fromSchoolCourses from '@rds-store/school/school-courses';
import * as fromSchoolCycles from '@rds-store/school/school-cycles';
import * as fromSchoolClassrooms from '@rds-store/school/school-classrooms';
import * as fromEntity from '@rds-store/config/entity-metadata';
import { SchoolRoutingModule } from './school-routing.module';
import { SharedModule } from '@rds-shared/shared.module';
import { AccountsDataService } from '@rds-store/accounts/accounts-data.service';
import { AccountsEntityService } from '@rds-store/accounts/accounts-entity.service';
import { EntityDefinitionService, EntityServices, EntityDataService } from '@ngrx/data';
import { AccountsDomainDataService } from '@rds-store/accounts-domain/accounts-domain-data.service';
import { AccountsDomainEntityService } from '@rds-store/accounts-domain/accounts-domain-entity.service';
import { SchoolCoursesDataService } from '@rds-store/school/school-courses/school-courses-data.service';
import { SchoolCoursesEntityService } from '@rds-store/school/school-courses/school-courses-entity.service';
import { SCHOOL_COMPONENTS } from './components';
import { SCHOOL_CONTAINERS } from './containers';
import { SCHOOL_SERVICES } from './services';
import { ACCOUNTS_SERVICES } from '@rds-accounts/services';
import { SchoolClassroomsDataService } from '@rds-store/school/school-classrooms/school-classrooms-data.service';
import { SchoolClassroomsEntityService } from '@rds-store/school/school-classrooms/school-classrooms-entity.service';
import { SchoolClassroomListComponent } from './components/school-classroom-list/school-classroom-list.component';
import { SchoolCyclesDataService } from '@rds-store/school/school-cycles/school-cycles-data.service';
import { SchoolCyclesEntityService } from '@rds-store/school/school-cycles/school-cycles-entity.service';
import { SchoolCyclesComponent } from './containers/school-cycles/school-cycles.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { AddSchoolCycleDialogComponent } from './components/add-school-cycle-dialog/add-school-cycle-dialog.component';


@NgModule({
  declarations: [...SCHOOL_COMPONENTS, ...SCHOOL_CONTAINERS],
  imports: [SharedModule, SchoolRoutingModule],
  providers: [
    ...SCHOOL_SERVICES,
    ...ACCOUNTS_SERVICES,
    SchoolCoursesEntityService,
    SchoolCoursesDataService,
    SchoolClassroomsDataService,
    SchoolClassroomsEntityService,
    SchoolCyclesDataService,
    SchoolCyclesEntityService,
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
    /* schoolStudentsDataService: SchoolStudentsDataService,
    schoolStudentsEntityService: SchoolStudentsEntityService,
    schoolTeachersDataService: SchoolTeachersDataService,
    schoolTeachersEntityService: SchoolTeachersEntityService, */
    schoolCoursesDataService: SchoolCoursesDataService,
    schoolCoursesEntityService: SchoolCoursesEntityService,
    schoolCyclesDataService: SchoolCyclesDataService,
    schoolCyclesEntityService: SchoolCyclesEntityService,
    schoolClassroomsDataService: SchoolClassroomsDataService,
    schoolClassroomsEntityService: SchoolClassroomsEntityService,
    accountsDomainEntityService: AccountsDomainEntityService,
    accountsDomainDataService: AccountsDomainDataService,
    accountsEntityService: AccountsEntityService,
    accountsDataService: AccountsDataService,
  ) {
    eds.registerMetadataMap(fromEntity.entityMetadata);
    entityServices.registerEntityCollectionServices([
      /* schoolTeachersEntityService,*/ schoolCyclesEntityService, accountsDomainEntityService, accountsEntityService, schoolCoursesEntityService, schoolClassroomsEntityService
    ]);
    /*  entityDataService.registerService(
       fromSchoolTeachers.entityCollectionName,
       schoolTeachersDataService
     );*/
    entityDataService.registerService(
      fromSchoolCycles.entityCollectionName,
      schoolCyclesDataService
    );
    entityDataService.registerService(
      fromSchoolCourses.entityCollectionName,
      schoolCoursesDataService
    );
    entityDataService.registerService(
      fromSchoolClassrooms.entityCollectionName,
      schoolClassroomsDataService
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
