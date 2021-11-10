import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SchoolLevel } from '@rds-auth/models/user.enum';
import { Observable } from 'rxjs';
import { StudentsCourses } from '../../models/students-courses.model';

@Component({
  selector: 'app-students-courses',
  templateUrl: './students-courses.component.html',
  styleUrls: ['./students-courses.component.scss']
})
export class StudentsCoursesComponent implements OnInit {
  loading$: Observable<boolean>;
  loaded$: Observable<boolean>;
  filterValues: FormGroup;
  schoolCourses$: Observable<StudentsCourses[]>;
  filteredEntities$: Observable<StudentsCourses[]>;
  resCount$: Observable<number>;
  gradeKeys;
  grades = SchoolLevel;
  constructor() {


  }

  ngOnInit(): void {
  }

}
