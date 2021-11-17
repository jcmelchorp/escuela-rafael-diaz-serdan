import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountsResolver } from '@rds-accounts/resolvers/accounts.resolver';
import { SchoolCoursesComponent } from './containers';
import { AssignedCoursesResolver } from './resolvers/assigned-courses.resolver';
import { TeachersResolver } from '../../classroom/teachers/services/teachers.resolver';

const routes: Routes = [
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class SchoolCoursesRoutingModule { }
