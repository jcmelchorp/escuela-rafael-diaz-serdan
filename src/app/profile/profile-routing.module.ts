import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from '@rds-shared/components';
import { ProfileMenuComponent } from './components';
import { ProfileComponent } from './containers/profile/profile.component';
import { ProfileScoresComponent } from './components/profile-scores/profile-scores.component';
import { ScoresResolver } from './resolvers/scores.resolver';
import { UserDetailsComponent } from '@rds-accounts/components/user-details/user-details.component';
import { AccountResolver } from '@rds-accounts/resolvers/account.resolver';
import { UserResolver } from './resolvers/user.resolver';
import { SchoolCalendarComponent } from './components/school-calendar/school-calendar.component';
import { AccountsResolver } from '../accounts/resolvers/accounts.resolver';

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    children: [
      {
        path: '',
        component: ProfileMenuComponent,
        resolve: { user: UserResolver },
        children: [
          {
            path: 'calificaciones',
            component: ProfileScoresComponent,
            resolve: { scores: ScoresResolver },
          },
          {
            path: 'calendario',
            component: SchoolCalendarComponent,

          },
          {
            path: ':id',
            component: UserDetailsComponent,
          }
        ]
      },

    ]
  },
  {
    path: '**',
    component: NotFoundComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [ScoresResolver, UserResolver, AccountsResolver]
})
export class ProfileRoutingModule { }
