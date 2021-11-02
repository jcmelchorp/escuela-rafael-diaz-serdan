import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '@rds-accounts/guards/admin.guard';
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
