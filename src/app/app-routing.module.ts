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
        path: 'usuarios',
        loadChildren: () => import('./accounts/accounts.module').then(
          m => m.AccountsModule),
        canActivate: [AdminGuard],
        data: { breadcrumb: null }
      },
      {
        path: 'escuela',
        loadChildren: () => import('./school/school.module').then(
          m => m.SchoolModule),
        canActivate: [AdminGuard],
        data: { breadcrumb: null }
      },
      {
        path: 'perfil',
        loadChildren: () => import('./profile/profile.module').then(
          m => m.ProfileModule),
        canActivate: [AuthGuard],
        data: { breadcrumb: null }
      },
      {
        path: 'gsuite',
        loadChildren: () => import('@rds-classroom/classroom.module').then(
          (m) => m.ClassroomModule),
        canActivate: [AuthGuard],
        data: { breadcrumb: 'Google GSuite' },
      },
      {
        path: 'profesores',
        loadChildren: () =>
          import('./teachers/teachers.module').then((m) => m.TeachersModule),
        canActivate: [TeachersGuard],
        data: { breadcrumb: 'Profesores' },
      },
      {
        path: 'config',
        component: SettingsComponent,
        canActivate: [AuthGuard],
        data: { breadcrumb: 'Configuración' },
      },
      {
        path: '**',
        component: NotFoundComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
