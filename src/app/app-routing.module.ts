import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '@rds-admin/guards/admin.guard';
import { AuthGuard } from '@rds-auth/guards/auth.guard';
import { SettingsComponent } from '@rds-core/components';
import { LayoutComponent } from '@rds-core/containers';
import { HomeComponent, NotFoundComponent } from '@rds-shared/components';
import { TeachersGuard } from './teachers/guards/teachers.guard';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    data: { breadcrumb: 'Inicio' },
    children: [
      {
        path: '', component: HomeComponent,
        data: { breadcrumb: '' },
      },
      {
        path: 'i',
        loadChildren: () => import('@rds-info/information.module').then(
          m => m.InformationModule),
      },
      {
        path: 'u',
        loadChildren: () => import('@rds-accounts/accounts.module').then(
          m => m.AccountsModule),
        canActivate: [(TeachersGuard || AdminGuard)],
      },
      {
        path: 'e',
        loadChildren: () => import('@rds-school/school.module').then(
          m => m.SchoolModule),
        data: { breadcrumb: '' },
        canActivate: [(TeachersGuard || AdminGuard)],
      },
      {
        path: 'p',
        loadChildren: () => import('@rds-profile/profile.module').then(
          m => m.ProfileModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'g',
        loadChildren: () => import('@rds-classroom/classroom.module').then(
          (m) => m.ClassroomModule),
        canActivate: [(TeachersGuard || AdminGuard)],
      },
      {
        path: 'profe',
        loadChildren: () => import('@rds-teachers/school-teachers.module').then(
          (m) => m.SchoolTeachersModule),
        canActivate: [(TeachersGuard || AdminGuard)],
      },
      {
        path: 'config',
        component: SettingsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'admin',
        loadChildren: () => import('@rds-admin/admin.module').then(
          m => m.AdminModule),
        canActivate: [(TeachersGuard || AdminGuard)],
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
  exports: [RouterModule],
  providers: [AuthGuard, AdminGuard, TeachersGuard]
})
export class AppRoutingModule { }
