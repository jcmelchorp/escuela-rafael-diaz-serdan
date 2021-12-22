import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InformationRoutingModule } from './information-routing.module';
import { INFO_COMPONENTS } from './components';
import { INFO_CONTAINERS } from './containers';
import { SharedModule } from '../shared/shared.module';
import { AlertModule } from 'ngx-bootstrap/alert';
import { YouTubePlayerModule } from '@angular/youtube-player';
@NgModule({
  declarations: [
    ...INFO_COMPONENTS, ...INFO_CONTAINERS],
  imports: [
    SharedModule,
    InformationRoutingModule,
    AlertModule,
    YouTubePlayerModule
  ], providers: []
})
export class InformationModule { }
