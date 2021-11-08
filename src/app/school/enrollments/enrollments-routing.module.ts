import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '@rds-accounts/guards/admin.guard';
import { SchoolDashboardComponent } from '@rds-school/school-dashboard/school-dashboard.component';
import { EnrollmentComponent } from './containers/enrollment/enrollment.component';

const routes: Routes = [

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class EnrollmentsRoutingModule { }
