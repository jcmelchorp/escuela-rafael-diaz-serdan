import { NgModule } from '@angular/core';
import * as fromAccountsDomain from '@rds-store/accounts-domain';
import { AdminRoutingModule } from './admin-routing.module';
import { ADMIN_SERVICES } from './services';
import { ADMIN_COMPONENTS } from './components';
import { ADMIN_CONTAINERS } from './containers';
import { SharedModule } from '@rds-shared/shared.module';
import { AccountsDomainService } from '@rds-accounts/services/accounts-domain.service';
import { AccountsDomainDataService } from '@rds-store/accounts-domain/accounts-domain-data.service';
import { AccountsDomainEntityService } from '@rds-store/accounts-domain/accounts-domain-entity.service';
import { EntityDataService, EntityDefinitionService, EntityServices } from '@ngrx/data';
import * as fromEntity from '@rds-store/config/entity-metadata';
import { AccountsService } from '@rds-accounts/services/accounts.service';
@NgModule({
  declarations: [
    ...ADMIN_COMPONENTS, ...ADMIN_CONTAINERS
  ],
  imports: [
    SharedModule, AdminRoutingModule
  ],
  providers: [
    ...ADMIN_SERVICES,
    AccountsService,
    AccountsDomainService,
    AccountsDomainDataService,
    AccountsDomainEntityService,
  ]
})
export class AdminModule {
  constructor(
    eds: EntityDefinitionService,
    entityServices: EntityServices,
    entityDataService: EntityDataService,
    accountsDomainEntityService: AccountsDomainEntityService,
    accountsDomainDataService: AccountsDomainDataService
  ) {
    eds.registerMetadataMap(fromEntity.entityMetadata);
    entityServices.registerEntityCollectionServices([
      accountsDomainEntityService
    ]);
    entityDataService.registerService(
      fromAccountsDomain.entityCollectionName,
      accountsDomainDataService
    );
  }
}
