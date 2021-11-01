import { NgModule, Optional, SkipSelf } from '@angular/core';
import { SharedModule } from '@rds-shared/shared.module';
import { coreServices } from './services';
import { coreContainers } from './containers';
import { coreComponents } from './components';
@NgModule({
  declarations: [...coreComponents, ...coreContainers],
  imports: [SharedModule],
  providers: [...coreServices],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() core: CoreModule) {
    if (core) {
      throw new Error('You should import core module only in the root module')
    }
  }
}
