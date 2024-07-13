import { Component, OnInit } from '@angular/core';
import { HttpParameterCodec } from "@angular/common/http";

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {
  alert: any = {
    type: 'danger',
    msg: `Debido a las restricciones en materia de salud causadas por la emergencia sanitaria, y de acuerdo con los señalamientos del semáforo epidemiologico para instituciones de educación básica, el acceso queda restringido hasta nuevo aviso. Te invitamos a que te pongas en contacto con nosotros y conoscas nuestro proyecto educativo a distancia.`
  };
  dismissible = true;
  constructor() { }

  ngOnInit(): void {
  }

}
