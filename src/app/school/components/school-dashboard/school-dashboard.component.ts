import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  faSchool,
  faBook,
  faTools,
  faClipboard,
} from '@fortawesome/free-solid-svg-icons';
import { flyInOut, heightReveal } from '@rds-shared/animations/fade-in.animation';

@Component({
  selector: 'app-school-dashboard',
  templateUrl: './school-dashboard.component.html',
  styleUrls: ['./school-dashboard.component.scss'],
  animations: [heightReveal], //[@fadeIn]="'fadeIn'"
})
export class SchoolDashboardComponent implements OnInit {
  raisedElev: number = 12;
  assigmentLinks: any[];
  constructor() { }
  ngOnInit(): void {
    this.assigmentLinks = [

      {
        title: 'Inscripciones',
        description: 'Materias y clases dentro de la institución',
        route: 'a',
        icon: faClipboard,
      },
      {
        title: 'Materias',
        description: 'Administra materias y clases',
        route: 'm',
        icon: faBook,
      },
    ];
  }
}
