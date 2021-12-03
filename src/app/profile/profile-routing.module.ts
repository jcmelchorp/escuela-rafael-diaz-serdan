import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from '@rds-shared/components';
import { ProfileMenuComponent } from './components';
import { ProfileComponent } from './containers/profile/profile.component';
import { ProfileScoresComponent } from './components/profile-scores/profile-scores.component';
import { ScoresResolver } from './resolvers/scores.resolver';
import { UserDetailsComponent } from '@rds-accounts/components/user-details/user-details.component';

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    children: [
      {
        path: '',
        component: ProfileMenuComponent,
        children: [
          {
            path: 'calificaciones',
            component: ProfileScoresComponent,
            resolve: { scores: ScoresResolver },
          },
          {
            path: 'editar',
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
  providers: [ScoresResolver]
})
export class ProfileRoutingModule { }
