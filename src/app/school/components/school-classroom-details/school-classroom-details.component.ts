import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '@rds-auth/models/user.model';
import { SchoolClassroom } from '@rds-school/models/school-course.model';
import { AccountsEntityService } from '@rds-store/accounts/accounts-entity.service';
import { SchoolClassroomsEntityService } from '@rds-store/school/school-classrooms/school-classrooms-entity.service';
import { SchoolCoursesEntityService } from '@rds-store/school/school-courses/school-courses-entity.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-school-classroom-details',
  templateUrl: './school-classroom-details.component.html',
  styleUrls: ['./school-classroom-details.component.scss']
})
export class SchoolClassroomDetailsComponent implements OnInit {
  @Input() classroom: SchoolClassroom;
  students$: Observable<User[]>;
  @Output() onClassroomEmit = new EventEmitter<SchoolClassroom>();
  constructor(
    private schoolClassroomsEntityService: SchoolClassroomsEntityService,
    private accountsEntityService: AccountsEntityService,
  ) {

  }


  ngOnInit(): void {
    this.students$ = this.accountsEntityService.entities$.pipe(
      map(users => users.filter(user => user.grade === this.classroom.grade))
    );
    console.log(this.classroom)
  }
  assignCoursesToClassroom(classroom: SchoolClassroom) {

  }
}
