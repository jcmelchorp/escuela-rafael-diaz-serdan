import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';



import { StudentCoursesResolver } from './services/student-courses.resolver';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { UserProfileComponent } from './containers/user-profile/user-profile.component';

const routes: Routes = [
  {
    path: '', component: UserProfileComponent, children: [
      //{ path: '', component: UserHomeComponent },
      { path: 'edit', component: EditProfileComponent },
      /*  {
         path: 'user-grades', component: UserGradesComponent
       }, */
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserProfilesRoutingModule { }
