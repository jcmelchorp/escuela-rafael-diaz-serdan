import { Component } from '@angular/core';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
  RouterEvent,
} from '@angular/router';
import { CdkScrollable, OverlayContainer, ScrollDispatcher } from '@angular/cdk/overlay';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { LayoutService, ThemeService } from '@rds-core/services';
import { User } from '@rds-auth/models/user.model';
import { AppState } from '@rds-store/app.state';
import * as fromAuthSelectors from '@rds-auth/state/auth.selectors';
import { setDarkMode } from '@rds-core/state/config.actions';
import { isDarkMode } from '@rds-core/state/config.selectors';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
  isHandset$!: Observable<boolean>;
  isDarkTheme!: Observable<boolean>;
  user$!: Observable<User>;
  isOnline$!: Observable<boolean>;
  isAdmin$!: Observable<boolean>;
  isTeacher$!: Observable<boolean>;
  loading: boolean = false;
  constructor(
    private layoutService: LayoutService,
    public themeService: ThemeService,
    private router: Router,
    private overlay: OverlayContainer,
    private store: Store<AppState>
  ) {
    this.router.events.subscribe((event_2) =>
      this.navigationInterceptor(event_2 as RouterEvent)
    );
    this.isHandset$ = this.layoutService.isHandset$;
    this.isOnline$ = this.store.select(fromAuthSelectors.isOnline);
    this.user$ = this.store.select(fromAuthSelectors.selectUser);
    this.isAdmin$ = this.store.select(fromAuthSelectors.isAdmin);
    this.isTeacher$ = this.store.select(fromAuthSelectors.isTeacher);
  }
  // Shows and hides the loading spinner during RouterEvent changes
  navigationInterceptor(event: RouterEvent): void {
    switch (true) {
      case event instanceof NavigationStart: {
        this.loading = true;
        break;
      }
      case event instanceof NavigationEnd:
      case event instanceof NavigationCancel:
      case event instanceof NavigationError: {
        this.loading = false;
        break;
      }
      default: {
        break;
      }
    }
  }
  ngOnInit(): void {
    this.isDarkTheme = this.store.select(isDarkMode);
    const isDark: boolean = JSON.parse(localStorage.getItem('rds-config-is-dark'));
    if (isDark) {
      this.store.dispatch(setDarkMode({ isDark: isDark }));
    }
    this.isDarkTheme.subscribe((isDark) => {
      if (isDark) {
        this.overlay.getContainerElement().classList.add('theme-alternate');
      } else {
        this.overlay.getContainerElement().classList.remove('theme-alternate');
      }
    });

  }
}
