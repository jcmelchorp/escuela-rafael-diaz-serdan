import { Component, OnInit, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { select, Store } from '@ngrx/store';
import { AppState } from '@rds-store/app.state';
import * as fromAuthSelectors from '@rds-auth/state/auth.selectors';
import { User } from '@rds-auth/models/user.model';

import { Observable } from 'rxjs';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isOnline$: Observable<boolean>;
  user$: Observable<User>;
  isTeacher$: Observable<boolean>;
  isAdmin$: Observable<boolean>;
  alerts: any[];
  streaming: any;
  constructor(
    private store: Store<AppState>,
    sanitizer: DomSanitizer
  ) {
    this.isOnline$ = this.store.pipe(select(fromAuthSelectors.isOnline));
    this.isTeacher$ = this.store.select(fromAuthSelectors.isTeacher);
    this.isAdmin$ = this.store.select(fromAuthSelectors.isAdmin);
    this.user$ = this.store.pipe(select(fromAuthSelectors.selectUser));
    this.streaming = {
      dismissible: true,
      type: 'info',
      visible: true,
      link: 'https://envivo-rds.web.app',
      msg: sanitizer.sanitize(SecurityContext.HTML, 'Ingresa a la <strong>transmisión en vivo</strong> de la ceremonia de graduación 2020-21. <br>Acompañanos el día <strong>8 de julio de 2021 a partir de las 9:00 am.</strong>. Puedes acceder aquí en este anuncio')
    }
    this.alerts = [{
      dismissible: true,
      type: 'success',
      visible: false,
      link: 'user/grades',
      msg: sanitizer.sanitize(SecurityContext.HTML, 'Conoce tus calificaciones de la Unidad 2 en la sección "Información Académica". <br>Disponibles a partir del <strong>24 de marzo de 2021</strong>.')
    },
    {
      dismissible: true,
      type: 'success',
      visible: false,
      link: 'reopenning',
      msg: sanitizer.sanitize(SecurityContext.HTML, 'Conoce los requerimientos para la <strong>modalidad mixta</strong> en la reapertura de los centros educativos, a partir del <strong>1 de junio de 2021</strong>.')
    },
    {
      dismissible: true,
      type: 'info',
      visible: true,
      link: 'youtube',
      msg: sanitizer.sanitize(SecurityContext.HTML, 'Ingresa a la <strong>transmisión en vivo</strong> de la ceremonia de graduación 2020-21. <br>Acompañanos el día <strong>8 de julio de 2021 a partir de las 9:00 am.</strong>. Puedes acceder aquí en este anuncio')
    }]
  }
  ngOnInit(): void {

  }

}
