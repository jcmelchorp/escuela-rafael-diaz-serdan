import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountsListComponent, AccountsTableComponent, UserDetailsComponent } from './components';
import { AccountsComponent } from './containers';
import { AccountResolver } from './resolvers/account.resolver';
import { AccountsResolver } from './resolvers/accounts.resolver';

const routes: Routes = [
  {
    path: '', component: AccountsComponent,
    data: { breadcrumb: 'Cuentas de usuarios' },
    resolve: { users: AccountsResolver },
    children: [
      {
        path: 'accounts', component: AccountsTableComponent,
        data: { breadcrumb: 'Tabla de usuarios' },

      },
      {
        path: ':id', component: UserDetailsComponent,
        resolve: { user: AccountResolver },
        data: { breadcrumb: 'Edita usuario' },

      },
      {
        path: 'list', component: AccountsListComponent,
        data: { breadcrumb: 'Lista de usuarios' },
      },
      { path: '', redirectTo: 'accounts', pathMatch: 'full' },
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AccountsResolver, AccountResolver]
})
export class AccountsRoutingModule { }
