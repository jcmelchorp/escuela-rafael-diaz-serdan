import { Component, OnInit } from '@angular/core';

import { faMoon, faSun } from '@fortawesome/free-regular-svg-icons';
import { Store } from '@ngrx/store';
import { changeDarkMode } from '@rds-core/state/config.actions';
import { isDarkMode } from '@rds-core/state/config.selectors';
import { AppState } from '@rds-store/app.state';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ThemeService } from '../../services';
import { toggleDarkMode } from '../../state/config.actions';

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
  isDarkTheme$: Observable<boolean>;
  isDarkTheme: boolean;
  constructor(
    private store: Store<AppState>,
  ) {

  }
  ngOnInit(): void {
    this.isDarkTheme$ = this.store.select(isDarkMode).pipe(map(isDark => this.isDarkTheme = isDark));
  }

  toggleDarkTheme(isDarkTheme: boolean) {
    console.log(isDarkTheme)
    this.store.dispatch(toggleDarkMode({ isDark: isDarkTheme }));
  }

}
