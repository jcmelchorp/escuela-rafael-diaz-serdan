import { Component, OnInit } from '@angular/core';
import { heightReveal } from '@rds-shared/animations/fade-in.animation';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.scss'],
  animations: [heightReveal]

})
export class TeachersComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
