import { Component, EventEmitter, Input, OnInit, Output, OnDestroy } from '@angular/core';
import { SchoolLevel } from '@rds-auth/models/user.enum';
import { User } from '@rds-auth/models/user.model';
import { SchoolClassroom } from '@rds-school/models/school-course.model';
import { AccountsEntityService } from '@rds-store/accounts/accounts-entity.service';
import { SchoolClassroomsEntityService } from '@rds-store/school/school-classrooms/school-classrooms-entity.service';
import { SchoolCoursesEntityService } from '@rds-store/school/school-courses/school-courses-entity.service';
import { Observable, Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-school-classroom-details',
  templateUrl: './school-classroom-details.component.html',
  styleUrls: ['./school-classroom-details.component.scss']
})
export class SchoolClassroomDetailsComponent implements OnInit, OnDestroy {
  @Input() classroom: SchoolClassroom;
  students: User[];
  students$: Observable<User[]>;
  levels = SchoolLevel;
  subscription: Subscription
  @Output() onClassroomEmit = new EventEmitter<SchoolClassroom>();
  constructor(
    private schoolClassroomsEntityService: SchoolClassroomsEntityService,
    private accountsEntityService: AccountsEntityService,
  ) {

  }
  ngOnDestroy(): void {
  }
  lookForStudents(classroom) {
    let classWithStudents: Partial<SchoolClassroom> = { id: classroom.id, studentsEmails: [] };
    this.accountsEntityService.entities$.subscribe(users => {
      this.students = users.filter(user => user.grade === this.levels[classroom.grade]);
    }).unsubscribe();
    this.students.forEach(student => {
      classWithStudents.studentsEmails.push(student.primaryEmail);
    });
    this.schoolClassroomsEntityService.update(classWithStudents);
    console.log(classWithStudents)
  }

  ngOnInit(): void {

  }
  assignCoursesToClassroom(classroom: SchoolClassroom) {

  }
}
