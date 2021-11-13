import { NgModule } from '@angular/core';
import { ProfileRoutingModule } from './profile-routing.module';
import { SharedModule } from '../shared/shared.module';
import { PROFILE_CONTAINERS } from './containers';
import { PROFILE_COMPONENTS } from './components';
import { ProfileService } from './services/profile.service';
import { ScoresDataService } from '@rds-store/scores/scores-data.service';
import { ScoresEntityService } from '@rds-store/scores/school-entity.service';
import { EntityDataService, EntityDefinitionService, EntityServices } from '@ngrx/data';
import * as fromScores from '@rds-store/scores';
import * as fromEntity from '@rds-store/config/entity-metadata';
@NgModule({
  declarations: [
    PROFILE_CONTAINERS, PROFILE_COMPONENTS
  ],
  providers: [
    ProfileService,
    ScoresDataService,
    ScoresEntityService
  ],
  imports: [
    SharedModule,
    ProfileRoutingModule
  ]
})
export class ProfileModule {
  constructor(
    eds: EntityDefinitionService,
    entityServices: EntityServices,
    entityDataService: EntityDataService,
    scoresEntityService: ScoresEntityService,
    scoresDataService: ScoresDataService
  ) {
    eds.registerMetadataMap(fromEntity.entityMetadata);
    entityServices.registerEntityCollectionServices([
      scoresEntityService
    ]);
    entityDataService.registerService(
      fromScores.entityCollectionName,
      scoresDataService
    );
  }
}
