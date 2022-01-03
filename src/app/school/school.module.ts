import { NgModule } from '@angular/core';
import * as fromAccounts from '@rds-store/accounts';
import * as fromAccountsDomain from '@rds-store/accounts-domain';
import * as fromSchoolTeachers from '@rds-store/school/school-teachers';
import * as fromSchoolStudents from '@rds-store/school/school-students';
import * as fromSchoolCourses from '@rds-store/school/school-courses';
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
import { SchoolTeachersDataService } from '@rds-store/school/school-teachers/school-teacher-data.service';
import { SchoolTeachersEntityService } from '@rds-store/school/school-teachers/school-teacher-entity.service';
import { SchoolStudentsDataService } from '@rds-store/school/school-students/school-students-data.service';
import { SchoolStudentsEntityService } from '@rds-store/school/school-students/school-students-entity.service';
import { SCHOOL_COMPONENTS } from './components';
import { SCHOOL_CONTAINERS } from './containers';
import { SCHOOL_SERVICES } from './services';
import { ACCOUNTS_SERVICES } from '@rds-accounts/services';
import { SchoolClassroomsDataService } from '@rds-store/school/school-classrooms/school-classrooms-data.service';
import { SchoolClassroomsEntityService } from '@rds-store/school/school-classrooms/school-classrooms-entity.service';
import { SchoolClassroomDetailsComponent } from './components/school-classroom-details/school-classroom-details.component';
import { SchoolClassroomListComponent } from './components/school-classroom-list/school-classroom-list.component';


@NgModule({
  declarations: [...SCHOOL_COMPONENTS, ...SCHOOL_CONTAINERS, SchoolClassroomListComponent],
  imports: [SharedModule, SchoolRoutingModule],
  providers: [
    ...SCHOOL_SERVICES,
    ...ACCOUNTS_SERVICES,
    SchoolCoursesEntityService,
    SchoolCoursesDataService,
    SchoolClassroomsDataService,
    SchoolClassroomsEntityService,
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
    schoolClassroomsDataService: SchoolClassroomsDataService,
    schoolClassroomsEntityService: SchoolClassroomsEntityService,
    accountsDomainEntityService: AccountsDomainEntityService,
    accountsDomainDataService: AccountsDomainDataService,
    accountsEntityService: AccountsEntityService,
    accountsDataService: AccountsDataService,
  ) {
    eds.registerMetadataMap(fromEntity.entityMetadata);
    entityServices.registerEntityCollectionServices([
      /* schoolTeachersEntityService, schoolStudentsEntityService, */ accountsDomainEntityService, accountsEntityService, schoolCoursesEntityService, schoolClassroomsEntityService
    ]);
    /*  entityDataService.registerService(
       fromSchoolTeachers.entityCollectionName,
       schoolTeachersDataService
     );
     entityDataService.registerService(
       fromSchoolStudents.entityCollectionName,
       schoolStudentsDataService
     ); */
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
