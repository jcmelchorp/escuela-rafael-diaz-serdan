import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LayoutService } from '../../services';
import { Store } from '@ngrx/store';
import {
  faDoorClosed,
  faDoorOpen,
  faSlidersH,
} from '@fortawesome/free-solid-svg-icons';
import { AppState } from '@rds-store/app.state';
import { LoginDialogComponent } from '@rds-auth/components';
import { User } from '@rds-auth/models/user.model';
import { signOut } from '@rds-auth/state/auth.actions';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import { AdminApiService } from '@rds-admin/services';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None
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
  faYoutube = faYoutube;
  isDoorOpen: boolean = false;
  canLogout!: boolean;
  constructor(
    private layoutService: LayoutService,
    private dialog: MatDialog,
    private store: Store<AppState>,
    // private adminApiService: AdminApiService,

  ) { }

  toggleSidenavLeft($event: any) {
    this.layoutService.toggleSidenavLeft.emit($event);
  }
  onLogin() {
    this.isDoorOpen = true;
    const dialogRef = this.dialog.open(LoginDialogComponent, {
      height: 'fit-content',
      width: '400px',
      maxWidth: '512px',
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
  prepareForLogout(): void {

    this.canLogout = true;
  }
}
