import { Component, Input, OnInit } from '@angular/core';
import { User } from '@rds-auth/models/user.model';

@Component({
  selector: 'app-school-student',
  templateUrl: './school-student.component.html',
  styleUrls: ['./school-student.component.scss']
})
export class SchoolStudentComponent implements OnInit {
  @Input() student: User;
  @Input() priority!: number;
  constructor() { }

  ngOnInit() {
  }

}
