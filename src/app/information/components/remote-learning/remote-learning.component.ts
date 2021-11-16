import { Component, OnInit } from '@angular/core';

import { CarouselConfig } from 'ngx-bootstrap/carousel';

@Component({
  selector: 'app-remote-learning',
  templateUrl: './remote-learning.component.html',
  styleUrls: ['./remote-learning.component.scss'],
  providers: [
    { provide: CarouselConfig, useValue: { interval: 1500, noPause: true, showIndicators: true } }
  ]
})
export class RemoteLearningComponent implements OnInit {
  itemsPerSlide = 2;
  singleSlideOffset = false;
  noWrap = false;
  slidesChangeMessage = '';

  picts: any[] = [
    {
      path: 'assets/scene/120896489_3353318561372251_3413422127144432972_o.jpg',
      altText: 'picture',
    },
    {
      path: 'assets/scene/145554877_3674428962594541_6430858538444380710_o.jpg',
      altText: 'picture',

    },
    {
      path: 'assets/scene/142807647_3651180938252677_2666928967365985320_o.jpg',
      altText: 'picture',

    },
    {
      path: 'assets/scene/136731354_3609776659059772_5825083095735666824_o.jpg',
      altText: 'picture',

    },
  ];

  infographics: any[] = [
    {
      file: 'assets/scene/tu-cuenta-institucional.png',
      title: 'Manual de cuentas institucionales',
      description: 'haz click en la imagen para descargar',
      size: ''
    },
    {
      file: 'assets/scene/social-distance.png',
      title: 'Medidas de distanciamiento social',
      description: 'haz click en la imagen para descargar',
      size: ''
    },
    {
      file: 'assets/scene/statement-template.png',
      title: 'Regreso a clases virtuales',
      description: 'haz click en la imagen para descargar',
      size: ''
    },
    {
      file: 'assets/scene/classroom01.png',
      title: 'Manual de Google Classroom',
      description: 'haz click en la imagen para descargar',
      size: ''
    },
    {
      file: 'assets/scene/tareas.png',
      title: 'Entrega de tareas',
      description: 'haz click en la imagen para descargar',
      size: ''
    },
    {
      file: 'assets/scene/ayuda.png',
      title: 'Línea de apoyo',
      description: 'haz click en la imagen para descargar',
      size: ''
    }
  ];
  constructor() { }

  ngOnInit(): void {
  }
  onSlideRangeChange(indexes: number[]): void {
    this.slidesChangeMessage = `Slides have been switched: ${indexes}`;
  }

}
