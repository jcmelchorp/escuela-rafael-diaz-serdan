import { Component, OnInit } from '@angular/core';
import {
  faGraduationCap,
  faIdCardAlt,
} from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { isAdmin, isOnline, isTeacher } from '@rds-auth/state/auth.selectors';
import { fadeInAnimation } from '@rds-shared/animations/fade-in.animation';
import { AppState } from '@rds-store/app.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-teachers-dashboard',
  templateUrl: './teachers-dashboard.component.html',
  styleUrls: ['./teachers-dashboard.component.scss'],
  animations: [fadeInAnimation], //[@fadeIn]="'fadeIn'"
})
export class TeachersDashboardComponent implements OnInit {
  teachersCards: any[];
  isTeacher$: Observable<boolean>;
  isAdmin$: Observable<boolean>;
  isOnline$: Observable<boolean>;
  constructor(private store: Store<AppState>) {
    this.isOnline$ = this.store.select(isOnline);
    this.isTeacher$ = this.store.select(isTeacher);
    this.isAdmin$ = this.store.select(isAdmin);
    this.teachersCards = [
      {
        title: 'Calificaciones',
        description: 'Asigna calificaciones a tus alumnos en asignaturas.',
        route: 'calificaciones',
        icon: faGraduationCap,
        access: this.isTeacher$ || this.isAdmin$,
      },

      {
        title: 'Información',
        description: 'Administra tus datos personales.',
        route: '/user',
        icon: faIdCardAlt,
        access: this.isTeacher$ || this.isAdmin$,
      },
    ];
  }
  ngOnInit(): void { }
}
