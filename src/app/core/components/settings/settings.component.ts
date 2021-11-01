import { Component, OnInit } from '@angular/core';

import { faMoon, faSun } from '@fortawesome/free-regular-svg-icons';

import { Observable } from 'rxjs';

import { ThemeService } from '../../services';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {
  defaultElevation = 4;
  raisedElevation = 6;
  faSun = faSun;
  faMoon = faMoon;
  langs: string[];
  isDarkTheme: Observable<boolean>;
  constructor(
    public themeService: ThemeService,
  ) {
    this.isDarkTheme = this.themeService.isDarkTheme;
  }

  toggleDarkTheme(isDark: boolean) {
    this.themeService.setDarkTheme(isDark);
  }

}
