import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '@rds-accounts/guards/admin.guard';
import { AuthGuard } from '@rds-auth/guards/auth.guard';
import { SettingsComponent } from '@rds-core/components';
import { LayoutComponent } from '@rds-core/containers';
import { HomeComponent, NotFoundComponent } from '@rds-shared/components';
import { TeachersGuard } from './teachers/guards/teachers.guard';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    data: { breadcrumb: 'Home' },
    children: [
      { path: '', component: HomeComponent, data: { breadcrumb: null } },
      {
        path: 'i', loadChildren: () => import('./information/information.module').then(
          m => m.InformationModule),
      },
      {
        path: 'usuarios',
        loadChildren: () => import('@rds-accounts/accounts.module').then(
          m => m.AccountsModule),
        canActivate: [AdminGuard],
      },
      {
        path: 'escuela',
        loadChildren: () => import('@rds-school/school.module').then(
          m => m.SchoolModule),
        canActivate: [AdminGuard],
      },
      {
        path: 'perfil',
        loadChildren: () => import('@rds-profile/profile.module').then(
          m => m.ProfileModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'gsuite',
        loadChildren: () => import('@rds-classroom/classroom.module').then(
          (m) => m.ClassroomModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'profesores',
        loadChildren: () => import('@rds-teachers/school-teachers.module').then((m) => m.SchoolTeachersModule),
        canActivate: [TeachersGuard],
      },
      {
        path: 'config',
        component: SettingsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: '**',
        component: NotFoundComponent,
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
