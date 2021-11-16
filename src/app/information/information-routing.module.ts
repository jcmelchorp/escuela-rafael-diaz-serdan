import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from '@rds-shared/components';
import { AboutComponent, ReopenningComponent, RemoteLearningComponent, PrivacyPolicyComponent, LocationComponent, LicenseComponent, CodeConductComponent, CodeConductSchoolComponent, TermsComponent } from './components';
import { InformationComponent } from './containers';

const routes: Routes = [
  { path: '', component: InformationComponent },
  {
    path: 'about',
    component: AboutComponent,
    data: { breadcrumb: '¿Quiénes somos?' },
  },
  {
    path: 'reopenning',
    component: ReopenningComponent,
    data: { breadcrumb: 'Reapertura' },
  },
  {
    path: 'remote-learning',
    component: RemoteLearningComponent,
    data: { breadcrumb: 'Educación a distancia' },
  },
  {
    path: 'privacy-policy',
    component: PrivacyPolicyComponent,
    data: { breadcrumb: 'Políticas de privacidad' },
  },
  { path: 'not-found', component: NotFoundComponent },
  {
    path: 'location',
    component: LocationComponent,
    data: { breadcrumb: '¿Dónde estamos?' },
  },
  { path: 'license', component: LicenseComponent },
  {
    path: 'code-conduct',
    component: CodeConductComponent,
    data: { breadcrumb: 'Código de conducta' },
  },
  { path: 'code-conduct-school', component: CodeConductSchoolComponent },
  {
    path: 'terms',
    component: TermsComponent,
    data: { breadcrumb: '¿Quiénes somos?' },
  },
  { path: '**', component: NotFoundComponent },];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InformationRoutingModule { }
