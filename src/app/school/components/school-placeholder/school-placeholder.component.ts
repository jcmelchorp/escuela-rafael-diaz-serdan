import { Component, OnInit } from '@angular/core';
import { heightReveal } from '@rds-shared/animations/fade-in.animation';

@Component({
  selector: 'app-school-placeholder',
  templateUrl: './school-placeholder.component.html',
  styleUrls: ['./school-placeholder.component.scss'],
  animations: [heightReveal],
})
export class SchoolPlaceholderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
