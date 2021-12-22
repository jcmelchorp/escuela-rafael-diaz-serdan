import { Component, Input, OnInit } from '@angular/core';
import { SchoolCourse } from '@rds-school/models/school-course.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SchoolCoursesEntityService } from '@rds-store/school/school-courses/school-courses-entity.service';

@Component({
  selector: 'app-school-course',
  templateUrl: './school-course.component.html',
  styleUrls: ['./school-course.component.scss']
})
export class SchoolCourseComponent implements OnInit {
  @Input() course: SchoolCourse
  constructor() { }

  ngOnInit() {
  }

}
