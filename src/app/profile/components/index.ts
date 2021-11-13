import { ProfileMenuComponent } from "./profile-menu/profile-menu.component";
import { ProfileScoresBarChartComponent } from "./profile-scores-bar-chart/profile-scores-bar-chart.component";
import { ProfileScoresListComponent } from "./profile-scores-list/profile-scores-list.component";
import { ProfileScoresTableComponent } from "./profile-scores-table/profile-scores-table.component";
import { ProfileScoresComponent } from "./profile-scores/profile-scores.component";
import { ProfileScoresRecommendationComponent } from "./profile-scores-recomendations/profile-scores-recommendations.component";
import { UserDetailsComponent } from '../../accounts/components/user-details/user-details.component';
import { ProfileInfoComponent } from './profile-info/profile-info.component';
export const PROFILE_COMPONENTS: any[] = [
  ProfileMenuComponent,
  ProfileScoresComponent,
  ProfileScoresTableComponent,
  ProfileScoresListComponent,
  ProfileScoresBarChartComponent,
  ProfileScoresRecommendationComponent,
  ProfileInfoComponent
];
export * from "./profile-info/profile-info.component"
export * from "./profile-menu/profile-menu.component";
export * from "./profile-scores/profile-scores.component"
export * from "./profile-scores-bar-chart/profile-scores-bar-chart.component"
export * from "./profile-scores-list/profile-scores-list.component"
export * from "./profile-scores-recomendations/profile-scores-recommendations.component"
export * from "./profile-scores-table/profile-scores-table.component"
