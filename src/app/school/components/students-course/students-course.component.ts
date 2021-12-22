import { Component, OnInit } from '@angular/core';
import { User } from '@rds-auth/models/user.model';
import { Observable } from 'rxjs';
import { SchoolStudentsEntityService } from '@rds-store/school/school-students/school-students-entity.service';

@Component({
  selector: 'app-students-course',
  templateUrl: './students-course.component.html',
  styleUrls: ['./students-course.component.scss']
})
export class StudentsCourseComponent implements OnInit {
  students$: Observable<User[]>;
  loaded$: Observable<boolean> = this.schoolStudentsEntityService.loaded$;
  loading$: Observable<boolean> = this.schoolStudentsEntityService.loading$;
  constructor(private schoolStudentsEntityService: SchoolStudentsEntityService) {
    this.students$ = this.schoolStudentsEntityService.entities$
  }

  ngOnInit(): void {
  }

}
