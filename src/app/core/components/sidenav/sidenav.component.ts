import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

import { Store } from '@ngrx/store';

import {
  onMainContentChange,
  onSideNavChange,
  animateText,
} from '@rds-shared/animations/animations';
import { User } from '@rds-auth/models/user.model';

import { AppState } from '@rds-root/app/store/app.state';

import { LayoutService } from '../../services';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { faUserTie, faBuilding, faUserGraduate, faCompressAlt, faExpandAlt } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  animations: [onMainContentChange, onSideNavChange, animateText],
})
export class SidenavComponent {
  @ViewChild('leftSidenav') sidenavLeft!: MatSidenav;
  @Input() isHandset: boolean;
  @Input() isOnline: boolean;
  @Input() isAdmin: boolean;
  @Input() isTeacher: boolean;
  @Input() user: User;
  onSideNavChange: boolean;
  mobileQuery!: MediaQueryList;
  linkText: boolean = false;
  sideNavState: boolean = false;
  faUserTie = faUserTie;
  faGoogle = faGoogle;
  faBuilding = faBuilding;
  faUserGraduate = faUserGraduate;
  faCompressAlt = faCompressAlt;
  faExpandAlt = faExpandAlt;
  constructor(
    private layoutService: LayoutService,
    private store: Store<AppState>
  ) {
    this.layoutService.toggleSidenavLeft.subscribe(() => {
      this.sidenavLeft.toggle();
    });
    this.layoutService.sideNavState$.subscribe((state: boolean) => {
      this.onSideNavChange = state;
    });
  }
  onSidenavToggle() {
    this.sideNavState = !this.sideNavState;
    setTimeout(() => {
      this.linkText = this.sideNavState;
    }, 100);
    this.layoutService.sideNavState$.next(this.sideNavState);
  }
}
