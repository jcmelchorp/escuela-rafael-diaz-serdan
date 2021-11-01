import { ModuleWithProviders, NgModule } from '@angular/core';
import { authServices } from './services';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '@rds-shared/shared.module';
import { authFeatureKey, authReducer } from './state/auth.reducer';
import { AuthEffects } from './state/auth.effects';
import { authComponents } from './components';
import { AuthGuard } from './guards/auth.guard';



@NgModule({
  declarations: [...authComponents],
  exports: [...authComponents],
  imports: [
    SharedModule,
    StoreModule.forFeature(authFeatureKey, authReducer),
    EffectsModule.forFeature([AuthEffects])
  ], providers: [...authServices, AuthGuard]
})
export class AuthModule {
  static forRoot(): ModuleWithProviders<AuthModule> {
    return {
      ngModule: AuthModule,
      providers: [...authServices],
    };
  }
}




