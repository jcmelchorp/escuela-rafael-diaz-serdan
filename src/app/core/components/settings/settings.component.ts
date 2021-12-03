import { Component, OnInit } from '@angular/core';

import { faMoon, faSun } from '@fortawesome/free-regular-svg-icons';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ThemeService } from '../../services';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  defaultElevation = 4;
  raisedElevation = 6;
  faSun = faSun;
  faMoon = faMoon;
  langs: string[];
  isDarkTheme: boolean;
  constructor(
    public themeService: ThemeService,
  ) {

  }
  ngOnInit(): void {
    this.themeService.isDarkTheme.subscribe(isDark => {
      console.log(isDark);
      this.isDarkTheme = isDark
    });
  }

  toggleDarkTheme() {
    this.themeService.setDarkTheme(!this.isDarkTheme);
  }

}
