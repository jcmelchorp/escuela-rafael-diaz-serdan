import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  SchoolDashboardComponent,
} from './components';
import { SchoolComponent, SchoolCoursesComponent } from './containers';
import { SchoolCoursesResolver } from './resolvers/school-courses.resolver';
import { SchoolUsersResolver } from './resolvers/school-users.resolver';


const routes: Routes = [
  {
    path: '',
    component: SchoolComponent,
    data: { breadcrumb: null },
    children: [
      {
        path: '',
        component: SchoolDashboardComponent,
        data: { breadcrumb: 'Dirección' },
      },
      {
        path: 'materias',
        component: SchoolCoursesComponent,
        resolve: { schoolUsers: SchoolCoursesResolver },
        data: { breadcrumb: 'Materias' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [SchoolUsersResolver, SchoolCoursesResolver],
})
export class SchoolRoutingModule { }
