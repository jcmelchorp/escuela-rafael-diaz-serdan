import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LayoutService } from '../../services';
import { Store } from '@ngrx/store';
import {
  faDoorClosed,
  faDoorOpen,
  faSignOutAlt,
  faSlidersH,
} from '@fortawesome/free-solid-svg-icons';
import { AppState } from '@rds-store/index';
import { LoginDialogComponent } from '@rds-auth/components';
import { User } from '@rds-auth/models/user.model';
import { signOut } from '@rds-auth/state/auth.actions';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input()
  isHandset!: boolean;
  @Input()
  user!: User;
  @Input()
  isOnline!: boolean;
  @Input()
  isAdmin!: boolean;
  @Input()
  isTeacher!: boolean;
  label: string = '';
  faSlidersH = faSlidersH;
  faDoorOpen = faDoorOpen;
  faDoorClosed = faDoorClosed;
  faSignOutAlt = faSignOutAlt;
  isDoorOpen: boolean = false;

  constructor(
    private layoutService: LayoutService,
    private dialog: MatDialog,
    private store: Store<AppState>
  ) { }

  toggleSidenavLeft($event: any) {
    this.layoutService.toggleSidenavLeft.emit($event);
  }
  onLogin() {
    this.isDoorOpen = true;
    const dialogRef = this.dialog.open(LoginDialogComponent, {
      height: 'fit-content',
      width: '600px',
      data: {},
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.isDoorOpen = false;
      if (result) {
      }
    });
  }
  onLogout(id: string) {
    this.isDoorOpen = false;
    this.store.dispatch(signOut({ id }));
  }
}
