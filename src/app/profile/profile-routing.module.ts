import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from '@rds-shared/components';
import { ProfileMenuComponent } from './components';
import { ProfileComponent } from './containers/profile/profile.component';
import { ProfileScoresComponent } from './components/profile-scores/profile-scores.component';
import { ScoreResolver } from './resolvers/score.resolver';

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
            //resolve: { scores: ScoreResolver },
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
  providers: [ScoreResolver]
})
export class ProfileRoutingModule { }
