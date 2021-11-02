import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '@rds-accounts/guards/admin.guard';
import { AuthGuard } from '@rds-auth/guards/auth.guard';
import { SettingsComponent } from '@rds-core/components';
import { LayoutComponent } from '@rds-core/containers';
import { HomeComponent, NotFoundComponent } from '@rds-shared/components';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    data: { breadcrumb: 'Home' },
    children: [
      { path: '', component: HomeComponent, data: { breadcrumb: null } },
      {
        path: 'accounts',
        loadChildren: () => import('./accounts/accounts.module').then(m => m.AccountsModule),
        canActivate: [AdminGuard],
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
      },
    ],
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
