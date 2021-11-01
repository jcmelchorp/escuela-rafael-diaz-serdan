import { ModuleWithProviders, NgModule } from '@angular/core';
import { sharedServices } from './services';
import { sharedComponents } from './components';
import { commonModules, formsModules, uiModules } from '@rds-modules/index';

@NgModule({
  declarations: [...sharedComponents],
  imports: [...commonModules, ...formsModules, ...uiModules],
  exports: [...commonModules, ...formsModules, ...uiModules, ...sharedComponents],
  providers: [...sharedServices]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [...sharedServices]
    }
  }
}
