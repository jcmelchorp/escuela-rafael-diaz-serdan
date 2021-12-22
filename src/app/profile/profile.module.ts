import { NgModule } from '@angular/core';
import { ProfileRoutingModule } from './profile-routing.module';
import { SharedModule } from '../shared/shared.module';
import { PROFILE_CONTAINERS } from './containers';
import { PROFILE_COMPONENTS } from './components';
import { ProfileService } from './services/profile.service';
import { ScoresDataService } from '@rds-store/scores/scores-data.service';
import { ScoresEntityService } from '@rds-store/scores/scores-entity.service';
import { EntityDataService, EntityDefinitionService, EntityServices } from '@ngrx/data';
import * as fromScores from '@rds-store/scores';
import * as fromAccounts from '@rds-store/accounts';
import * as fromEntity from '@rds-store/config/entity-metadata';
import { AccountsEntityService } from '@rds-store/accounts/accounts-entity.service';
import { AccountsDataService } from '@rds-store/accounts/accounts-data.service';
import { ACCOUNTS_SERVICES } from '../accounts/services/index';
import { ScoresService } from '../teachers/services/scores.service';
import { AlertModule } from 'ngx-bootstrap/alert';
@NgModule({
  declarations: [
    ...PROFILE_CONTAINERS, ...PROFILE_COMPONENTS],
  providers: [
    ...ACCOUNTS_SERVICES,
    ScoresService,
    ScoresDataService,
    ScoresEntityService,
    AccountsEntityService,
    AccountsDataService,
  ],
  imports: [
    SharedModule,
    ProfileRoutingModule,
    AlertModule
  ]
})
export class ProfileModule {
  constructor(
    eds: EntityDefinitionService,
    entityServices: EntityServices,
    entityDataService: EntityDataService,
    scoresEntityService: ScoresEntityService,
    scoresDataService: ScoresDataService,
    accountsEntityService: AccountsEntityService,
    accountsDataService: AccountsDataService
  ) {
    eds.registerMetadataMap(fromEntity.entityMetadata);
    entityServices.registerEntityCollectionServices([scoresEntityService, accountsEntityService]);
    entityDataService.registerService(fromScores.entityCollectionName, scoresDataService);
    entityDataService.registerService(fromAccounts.entityCollectionName, accountsDataService);
  }
}
