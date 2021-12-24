import { SchoolCourse } from '@rds-school/models/school-course.model';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, OnInit, Output, OnDestroy } from '@angular/core';
import { SchoolLevel } from '@rds-auth/models/user.enum';
import { User } from '@rds-auth/models/user.model';
import { SchoolClassroom } from '@rds-school/models/school-course.model';
import { SchoolService } from '@rds-school/services';
import { AccountsEntityService } from '@rds-store/accounts/accounts-entity.service';
import { SchoolClassroomsEntityService } from '@rds-store/school/school-classrooms/school-classrooms-entity.service';
import { SchoolCoursesEntityService } from '@rds-store/school/school-courses/school-courses-entity.service';
import { Observable, Subscription } from 'rxjs';
import { map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-school-classroom-details',
  templateUrl: './school-classroom-details.component.html',
  styleUrls: ['./school-classroom-details.component.scss']
})
export class SchoolClassroomDetailsComponent implements OnInit, OnDestroy {
  @Input() classroom: SchoolClassroom;
  classroom$: Observable<SchoolClassroom>;
  classroomId: string;
  studentEmail: string;
  students: any[];
  studentsEmails: string[];
  coursesIds: string[];
  courses: SchoolCourse[];
  students$: Observable<User[]>;
  levels = SchoolLevel;
  subscription: Subscription
  @Output() onClassroomEmit = new EventEmitter<SchoolClassroom>();
  constructor(
    private schoolClassroomsEntityService: SchoolClassroomsEntityService,
    private schoolCoursesEntityService: SchoolCoursesEntityService,
    public readonly accountsEntityService: AccountsEntityService,
    private schoolService: SchoolService,
  ) {

  }
  ngOnInit(): void {
    this.studentsEmails = [...this.classroom.studentsEmails];
    this.coursesIds = [...this.classroom.coursesIds];
    this.courses = [...this.classroom.courses];
    this.students = [...this.classroom.students]

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

  dropCourses(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      moveItemInArray(this.courses, event.previousIndex, event.currentIndex);
      this.courses = this.courses.map((course, i) => { return { ...course, priority: i + 1 } as SchoolCourse });
      this.classroom.courses = this.courses;
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }

    this.schoolService.updateCoursesInClassroom(this.classroom.id, event.container.data)

    event.container.data.forEach((courseId, i) => this.schoolCoursesEntityService.update({ id: courseId, priority: i + 1 } as SchoolCourse));
  }
  removeStudent(student: User, i: number) {
    this.schoolService.removeStudentFromClassroom(this.classroom.id, student.primaryEmail);
    this.students.splice(i, 1)
  }
  dropStudents(event: CdkDragDrop<string[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      moveItemInArray(this.students, event.previousIndex, event.currentIndex);
      this.classroom.students = this.students;
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }

    this.schoolService.updateStudentsInClassroom(this.classroom.id, event.container.data)
  }
  addStudent() {
    this.schoolService.addStudentEmailToClassroom(this.classroom.id, this.studentEmail);
    this.studentsEmails.push(this.studentEmail);
    this.classroom.studentsEmails = this.studentsEmails;
  }

}
