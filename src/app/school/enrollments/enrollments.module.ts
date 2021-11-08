import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { enrollmentsComponents } from './components';
import { enrollmentsContainers } from './containers';
import { EnrollmentsRoutingModule } from './enrollments-routing.module';
import { EnrollmentsService } from './services/enrollments.service';



@NgModule({
  declarations: [...enrollmentsContainers, ...enrollmentsComponents],
  providers: [EnrollmentsService,],
  imports: [
    SharedModule,
    EnrollmentsRoutingModule
  ]
})
export class EnrollmentsModule { }
