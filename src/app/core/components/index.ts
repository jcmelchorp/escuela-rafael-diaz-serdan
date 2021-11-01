import { SidenavComponent } from './sidenav/sidenav.component';
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import { SettingsComponent } from './settings/settings.component';
export const coreComponents: any[] = [
  HeaderComponent,
  MainComponent,
  SettingsComponent,
  SidenavComponent,
];

export * from './header/header.component';
export * from './main/main.component';
export * from './settings/settings.component';
export * from './sidenav/sidenav.component';
