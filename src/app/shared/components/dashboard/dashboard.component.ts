import {
  Component,
  Input,
  OnInit,
  ChangeDetectionStrategy,
} from '@angular/core';

import { Store } from '@ngrx/store';
import { isAdmin, isOnline, isTeacher } from '@rds-auth/state/auth.selectors';
import { RouterCard } from '@rds-shared/models/router-card.model';
import { AppState } from '@rds-root/app/store/app.state';
import { Observable } from 'rxjs';
import { flyInOut } from '../../animations/fade-in.animation';
import { User } from '../../../auth/models/user.model';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [flyInOut], //[@fadeIn]="'fadeIn'"
})
export class DashboardComponent {
  @Input()
  user: User;
  isTeacher$: Observable<boolean>;
  isAdmin$: Observable<boolean>;
  isOnline$: Observable<boolean>;

  cards: RouterCard[];
  raisedElev: number = 12;
  constructor(private store: Store<AppState>) {
    this.isOnline$ = this.store.select(isOnline);
    this.isTeacher$ = this.store.select(isTeacher);
    this.isAdmin$ = this.store.select(isAdmin);
    this.cards = [
      {
        title: 'Alumnos',
        description: 'Accede a toda tu información como alumno.',
        route: 'user',
        imgUrl: 'assets/images/assignment-grades2.png',
        access: this.isOnline$,
      },
      /* {
        title: 'Profesores',
        description: 'Acceso a las funciones docentes.',
        route: 'profesores',
        imgUrl: 'assets/images/dashboard-image2.png',
        access: this.isTeacher$ || this.isAdmin$,
      }, */
      {
        title: 'Dirección',
        description: 'Gestiona usuarios, grupos, clases y horarios en la institución.',
        route: 'escuela',
        imgUrl: 'assets/images/dashboard-image.png',
        access: this.isAdmin$,
      },
      {
        title: 'Cuentas de usuario',
        description: 'Manejo de usuarios de la institución',
        route: 'accounts',
        imgUrl: 'assets/images/assignment-grades2.png',
        access: this.isTeacher$ || this.isAdmin$,

      },
      {
        title: 'Funciones de G Suite',
        description: 'Administra Google Classroom y Google Admin Directory.',
        route: 'gsuite',
        imgUrl: 'assets/images/dashboard-google.png',
        access: (this.isTeacher$ || this.isAdmin$)
      }
      /*  {
         title: 'Cuentas de usuario de Google',
         description: 'Manejo de usuarios de Google Workspace',
         route: 'admin',
         imgUrl: 'assets/images/google-admin-img.png',
         access: this.isTeacher$ || this.isAdmin$,
       }, */
    ];
  }
}
