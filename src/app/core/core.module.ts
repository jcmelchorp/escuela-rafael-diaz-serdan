import { NgModule, Optional, SkipSelf } from '@angular/core';
import { SharedModule } from '@rds-shared/shared.module';
import { coreServices } from './services';
import { coreContainers } from './containers';
import { coreComponents } from './components';
import { AuthEffects } from '@rds-auth/state/auth.effects';
import { authFeatureKey } from '@rds-auth/state/auth.reducer';
import { ConfigEffects } from './state/config.effects';
import { configFeatureKey, configReducer } from './state/config.reducer';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { FooterComponent } from './components/footer/footer.component';
@NgModule({
  declarations: [...coreComponents, ...coreContainers],
  imports: [SharedModule,
    StoreModule.forFeature(configFeatureKey, configReducer),
    EffectsModule.forFeature([ConfigEffects])],
  providers: [...coreServices],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() core: CoreModule) {
    if (core) {
      throw new Error('You should import core module only in the root module')
    }
  }
}
