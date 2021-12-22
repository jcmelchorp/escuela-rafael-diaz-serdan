import { NgModule } from '@angular/core';
import { EntityDataModule } from '@ngrx/data';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '@rds-env/environment';
import { routerKey } from './router';
import { CustomSerializer } from './router/custom-serializer';
import { storeConfig } from './config/store-config';
import * as fromEntity from './config/entity-metadata';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { registeredEffects, ToastrStoreService } from './config/registered-effects';
import * as fromRoot from './app.state';
@NgModule({
  declarations: [],
  imports: [
    StoreModule.forRoot(fromRoot.reducers, storeConfig),
    !environment.production
      ? StoreDevtoolsModule.instrument()
      : StoreDevtoolsModule.instrument({
        maxAge: 30,
        logOnly: environment.production,
        features: {
          persist: true,
        }
      }),
    EffectsModule.forRoot(registeredEffects),
    EntityDataModule.forRoot(fromEntity.entityConfig),
    StoreRouterConnectingModule.forRoot({
      stateKey: routerKey,
      serializer: CustomSerializer,
    }),
  ],
  providers: [ToastrStoreService],
  exports: [
    StoreModule,
    StoreRouterConnectingModule,
    StoreDevtoolsModule,
    EffectsModule,
    EntityDataModule,
  ],
})
export class AppStoreModule { }
