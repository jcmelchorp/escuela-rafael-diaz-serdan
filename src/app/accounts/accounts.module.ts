import { NgModule } from '@angular/core';
import * as fromAccounts from '@rds-store/accounts';
import * as fromAccountsDomain from '@rds-store/accounts-domain';
import * as fromEntity from '@rds-store/config/entity-metadata';
import { AccountsRoutingModule } from './accounts-routing.module';
import { accountsContainers } from './containers';
import { SharedModule } from '../shared/shared.module';
import { EffectsModule } from '@ngrx/effects';
import { AccountsEffects } from './state/accounts.effects';
import { EntityDataService, EntityDefinitionService, EntityServices } from '@ngrx/data';
import { AccountsEntityService } from '@rds-store/accounts/accounts-entity.service';
import { AccountsDataService } from '@rds-store/accounts/accounts-data.service';
import { AccountsDomainEntityService } from '@rds-store/accounts-domain/accounts-domain-entity.service';
import { AccountsDomainDataService } from '@rds-store/accounts-domain/accounts-domain-data.service';
import { accountsComponents } from './components';
import { AccountsService } from './services/accounts.service';
import { AccountsDomainService } from './services/accounts-domain.service';


@NgModule({
  declarations: [
    ...accountsContainers,
    ...accountsComponents
  ],
  imports: [
    SharedModule,
    AccountsRoutingModule,
    EffectsModule.forFeature([AccountsEffects]),
  ],
  providers: [
    AccountsService,
    AccountsDataService,
    AccountsEntityService,
    AccountsDomainService,
    AccountsDomainDataService,
    AccountsDomainEntityService
  ]
})
export class AccountsModule {
  constructor(
    eds: EntityDefinitionService,
    entityServices: EntityServices,
    entityDataService: EntityDataService,
    accountsDomainEntityService: AccountsDomainEntityService,
    accountsDomainDataService: AccountsDomainDataService,
    accountsEntityService: AccountsEntityService,
    accountsDataService: AccountsDataService
  ) {
    eds.registerMetadataMap(fromEntity.entityMetadata);
    entityServices.registerEntityCollectionServices([accountsDomainEntityService, accountsEntityService]);
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
