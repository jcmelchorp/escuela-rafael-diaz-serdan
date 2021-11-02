import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '@rds-accounts/guards/admin.guard';
import {
  SchoolDashboardComponent,
} from './components';
import { SchoolComponent } from './containers';
import { SchoolUsersResolver } from './services/school-users.resolver';


const routes: Routes = [
  {
    path: '',
    component: SchoolComponent,
    data: { breadcrumb: null },
    children: [
      {
        path: '',
        component: SchoolDashboardComponent,
        data: { breadcrumb: null },
      },
      /*   {
          path: 'usuarios',
          component: SchoolUsersComponent,
          data: { breadcrumb: 'Usuarios' },
          resolve: { users: SchoolUsersResolver },
        },
        {
          path: 'usuarios/:id',
          component: SchoolUserComponent,
          data: { breadcrumb: ':id' },
        }, */
      /*   {
          path: 'grupos',
          loadChildren: () =>
            import('../rooms/rooms.module').then((m) => m.RoomsModule),
          canActivate: [AdminGuard],
          data: { breadcrumb: 'Asignaciones' },
        },
        {
          path: 'materias',
          loadChildren: () =>
            import('../subjects/subjects.module').then((m) => m.SubjectsModule),
          canActivate: [AdminGuard],
          data: { breadcrumb: 'Materias' },
        }, */


    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [SchoolUsersResolver],
})
export class SchoolRoutingModule { }
