import { NgModule } from '@angular/core';
import { EntityDefinitionService, EntityServices, EntityDataService } from '@ngrx/data';


import { SharedModule } from '@rds-shared/shared.module';
import { AccountsDomainDataService } from '@rds-root/app/store/accounts-domain/accounts-domain-data.service';
import { AccountsDomainEntityService } from '@rds-root/app/store/accounts-domain/accounts-domain-entity.service';
import { AccountsDataService } from '@rds-root/app/store/accounts/accounts-data.service';
import { AccountsEntityService } from '@rds-root/app/store/accounts/accounts-entity.service';
import * as fromAccounts from '@rds-root/app/store/accounts';
import * as fromAccountsDomain from '@rds-root/app/store/accounts-domain';
import * as fromSchoolCourses from '@rds-root/app/store/school/school-courses';
import * as fromEntity from '@rds-root/app/store/config/entity-metadata';
import { schoolComponents } from './components';
import { schoolContainers } from './containers';
import { SchoolRoutingModule } from './school-routing.module';
import { SchoolService } from './services/school.service';
import { AccountsDomainService } from '../accounts/services/accounts-domain.service';
import { AccountsService } from '../accounts/services/accounts.service';
import { SchoolCoursesService } from './services/school-courses.service';
import { SchoolCoursesEntityService } from '../store/school/school-courses/school-courses-entity.service';
import { SchoolCoursesDataService } from '@rds-root/app/store/school/school-courses/school-courses-data.service';



@NgModule({
  declarations: [...schoolComponents, ...schoolContainers],
  imports: [SharedModule, SchoolRoutingModule],
  providers: [
    SchoolService,
    SchoolCoursesService,
    AccountsDomainService,
    AccountsService,
    SchoolCoursesEntityService,
    SchoolCoursesDataService,
    AccountsDataService,
    AccountsEntityService,
    AccountsDomainDataService,
    AccountsDomainEntityService
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
    accountsDataService: AccountsDataService
  ) {
    eds.registerMetadataMap(fromEntity.entityMetadata);
    entityServices.registerEntityCollectionServices([
      schoolCoursesEntityService, accountsDomainEntityService, accountsEntityService
    ]);
    entityDataService.registerService(
      fromSchoolCourses.entityCollectionName,
      schoolCoursesDataService
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
