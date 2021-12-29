import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-school-calendar',
  templateUrl: './school-calendar.component.html',
  styleUrls: ['./school-calendar.component.scss']
})
export class SchoolCalendarComponent implements OnInit {
  raisedElev: number = 12;
  constructor() { }

  ngOnInit() {
  }

}
