import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDetailsComponent } from './components';
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
        path: 'edit/:id', component: UserDetailsComponent,
        resolve: { user: AccountResolver }
      },
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AccountsResolver, AccountResolver]
})
export class AccountsRoutingModule { }
