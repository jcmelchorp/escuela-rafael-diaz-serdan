import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminWellcomeComponent, UserDetailsComponent, UsersGroupsComponent } from './components';
import { AdminComponent, GroupsComponent, SchoolHomeComponent, UsersDomainComponent } from './containers';
import { AccountsDomainResolver, GroupsResolver } from './services';

const routes: Routes = [{
  path: '', component: AdminComponent, children: [
    { path: '', component: AdminWellcomeComponent, data: { breadcrumb: 'Google Admin' } },
    { path: 'usuarios', component: UsersDomainComponent, resolve: { users: AccountsDomainResolver } },
    { path: 'alumnos', component: SchoolHomeComponent, resolve: { users: AccountsDomainResolver } },
    { path: 'usuarios/:userId', component: UserDetailsComponent },
    { path: 'grupos', component: GroupsComponent, resolve: { groups: GroupsResolver } },
    { path: 'usuario-grupo', component: UsersGroupsComponent, resolve: { users: AccountsDomainResolver } },
  ]
}];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AccountsDomainResolver, GroupsResolver]
})
export class AdminRoutingModule { }
