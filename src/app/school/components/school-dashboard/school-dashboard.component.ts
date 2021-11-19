import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  faSchool,
  faBook,
  faTools,
  faClipboard,
} from '@fortawesome/free-solid-svg-icons';
import { fadeInAnimation } from '@rds-shared/animations/fade-in.animation';

@Component({
  selector: 'app-school-dashboard',
  templateUrl: './school-dashboard.component.html',
  styleUrls: ['./school-dashboard.component.scss'],
  animations: [fadeInAnimation], //[@fadeIn]="'fadeIn'"
})
export class SchoolDashboardComponent implements OnInit {
  raisedElev: number = 12;
  assigmentLinks: any[];
  constructor() { }
  ngOnInit(): void {
    this.assigmentLinks = [
      {
        title: 'Materias',
        description: 'Materias y clases dentro de la institución',
        route: ['m', 'c'],
        icon: faBook,
      },
      {
        title: 'Inscripciones',
        description: 'Materias y clases dentro de la institución',
        route: 'inscripciones',
        icon: faClipboard,
      },
      {
        title: 'Configuración',
        description: 'Servicios de configuración y base de datos',
        route: 'playground',
        icon: faTools,
      },
    ];
  }
}
