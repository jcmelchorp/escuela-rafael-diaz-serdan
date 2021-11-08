import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  SchoolDashboardComponent,
} from './components';
import { EnrollmentComponent, SchoolComponent, SchoolCoursesComponent } from './containers';
import { EnrollmentResolver } from './resolvers/enrollment.resolver';
import { SchoolCoursesResolver } from './resolvers/school-courses.resolver';
import { SchoolUsersResolver } from './resolvers/school-users.resolver';
import { SchoolInstructionsComponent } from './components/school-instructions/school-instructions.component';


const routes: Routes = [
  {
    path: '',
    component: SchoolComponent,
    resolve: { courses: SchoolCoursesResolver },
    children: [
      /* {
        path: '',
        component: SchoolDashboardComponent,
        data: { breadcrumb: 'Dirección' }
      }, */
      {
        path: '',
        component: SchoolCoursesComponent,
        data: { breadcrumb: 'Materias' }
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [SchoolUsersResolver, SchoolCoursesResolver, EnrollmentResolver],
})
export class SchoolRoutingModule { }
