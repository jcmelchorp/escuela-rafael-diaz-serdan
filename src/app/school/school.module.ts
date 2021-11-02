import { NgModule } from '@angular/core';
import { EntityDefinitionService, EntityServices, EntityDataService } from '@ngrx/data';


import { SharedModule } from '@rds-shared/shared.module';
import { AccountsDomainDataService } from '@rds-store/accounts-domain/accounts-domain-data.service';
import { AccountsDomainEntityService } from '@rds-store/accounts-domain/accounts-domain-entity.service';
import { AccountsDataService } from '@rds-store/accounts/accounts-data.service';
import { AccountsEntityService } from '@rds-store/accounts/accounts-entity.service';
import * as fromAccounts from '@rds-store/accounts';
import * as fromAccountsDomain from '@rds-store/accounts-domain';
import * as fromEntity from '@rds-store/config/entity-metadata';
import { schoolComponents } from './components';
import { schoolContainers } from './containers';
import { SchoolRoutingModule } from './school-routing.module';
import { SchoolService } from './services/school.service';
import { AccountsDomainService } from '../accounts/services/accounts-domain.service';
import { AccountsService } from '../accounts/services/accounts.service';


@NgModule({
  declarations: [...schoolComponents, ...schoolContainers],
  imports: [SharedModule, SchoolRoutingModule],
  providers: [
    SchoolService,
    AccountsDomainService,
    AccountsService,
    /* CourseRoomService,
    CourseRoomEntityService,
    CourseRoomDataService, */
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
    /* courseRoomEntityService: CourseRoomEntityService,
    courseRoomDataService: CourseRoomDataService, */
    accountsDomainEntityService: AccountsDomainEntityService,
    accountsDomainDataService: AccountsDomainDataService,
    accountsEntityService: AccountsEntityService,
    accountsDataService: AccountsDataService
  ) {
    eds.registerMetadataMap(fromEntity.entityMetadata);
    entityServices.registerEntityCollectionServices([
      /* courseRoomEntityService */, accountsDomainEntityService, accountsEntityService
    ]);
    /*  entityDataService.registerService(
       fromCourseRoom.entityCollectionName,
       courseRoomDataService
     ); */
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
