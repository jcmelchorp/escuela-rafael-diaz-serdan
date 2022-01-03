import { SchoolCourse } from '@rds-school/models/school-course.model';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, OnInit, Output, OnDestroy, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { SchoolLevel } from '@rds-auth/models/user.enum';
import { User } from '@rds-auth/models/user.model';
import { SchoolClassroom } from '@rds-school/models/school-course.model';
import { SchoolService } from '@rds-school/services';
import { AccountsEntityService } from '@rds-store/accounts/accounts-entity.service';
import { SchoolCoursesEntityService } from '@rds-store/school/school-courses/school-courses-entity.service';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { SchoolClassroomsEntityService } from '@rds-store/school/school-classrooms/school-classrooms-entity.service';


@Component({
  selector: 'app-school-classroom-details',
  templateUrl: './school-classroom-details.component.html',
  styleUrls: ['./school-classroom-details.component.scss']
})
export class SchoolClassroomDetailsComponent implements OnInit, OnDestroy, OnChanges {
  @Input() classroom: SchoolClassroom;
  currentClassroom: SchoolClassroom;
  classroom$: Observable<SchoolClassroom>;
  users: User[];
  classroomId: string;
  studentEmail: string;
  students$: Observable<User[]>;
  levels = SchoolLevel;
  subscription: Subscription;
  @Output() onClassroomEmit = new EventEmitter<string>();
  constructor(
    private schoolCoursesEntityService: SchoolCoursesEntityService,
    private schoolClassroomsEntityService: SchoolClassroomsEntityService,
    private accountsEntityService: AccountsEntityService,
    private schoolService: SchoolService,
  ) {

  }
  ngOnChanges(changes: SimpleChanges) {
    const courses: SchoolCourse[] = [];
    const students: User[] = [];
    const classroomChange: SimpleChange = changes.classroom;
    if (classroomChange.currentValue) {
      this.currentClassroom = new SchoolClassroom({
        id: classroomChange.currentValue.id,
        grade: classroomChange.currentValue.grade,
        cycle: classroomChange.currentValue.cycle,
        priority: classroomChange.currentValue.priority,
      });
      classroomChange.currentValue.coursesIds.forEach(courseId => {
        this.schoolCoursesEntityService.setFilter({ id: courseId });
        this.schoolCoursesEntityService.filteredEntities$.subscribe(course => {
          courses.push(course.pop());
        }).unsubscribe();
      });
      this.currentClassroom.addCourses(courses);
      this.currentClassroom.addCoursesIds(classroomChange.currentValue.coursesIds);

      classroomChange.currentValue.studentsEmails.forEach(studentEmail => {
        this.accountsEntityService.setFilter({ primaryEmail: studentEmail });
        this.accountsEntityService.filteredEntities$.subscribe(student => {
          students.push(student.pop());
        }).unsubscribe();
      });
      this.currentClassroom.addStudents(students);
      this.currentClassroom.addStudentsEmails(classroomChange.currentValue.studentsEmails);
    }
    //console.log(this.currentClassroom)
  }
  ngOnInit(): void {
    this.accountsEntityService.entities$.subscribe(users => this.users = users);
  }

  updateStudentList() {

  }
  ngOnDestroy(): void {
  }
  lookForCourses(classroom) {
    const coursesFn: SchoolCourse[] = [];
    const coursesIdsFn: string[] = [];
    this.schoolCoursesEntityService.setFilter({ grade: classroom.grade, cycle: classroom.cycle });
    this.schoolCoursesEntityService.filteredEntities$.subscribe(courses => {
      coursesFn.push(...courses.sort(
        (a, b) => (a.priority < b.priority) ? -1 : (a.priority > b.priority) ? 1 : 0
      ));
      coursesIdsFn.push(...coursesFn.map(course => course.id));
    }).unsubscribe();
    this.schoolClassroomsEntityService.update({ id: classroom.id, coursesIds: coursesIdsFn });
  }
  lookForStudents(classroom) {
    const studentsFn: User[] = [];
    const studentsEmailsFn: string[] = [];
    this.accountsEntityService.setFilter({ grade: this.levels[classroom.grade] });
    this.accountsEntityService.filteredEntities$.subscribe(students => {
      studentsFn.push(...students.sort(
        (a, b) => (a.name.familyName < b.name.familyName) ? -1 : (a.name.familyName > b.name.familyName) ? 1 : 0
      ));
      studentsEmailsFn.push(...studentsFn.map(student => student.primaryEmail));
    }).unsubscribe();
    this.schoolClassroomsEntityService.update({ id: classroom.id, studentsEmails: studentsEmailsFn });
  }

  dropCourses(event: CdkDragDrop<string[]>) {
    const coursesIds: string[] = [];
    coursesIds.push(...event.container.data);
    if (event.previousContainer === event.container) {
      moveItemInArray(coursesIds, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, coursesIds, event.previousIndex, event.currentIndex);
    }
    this.schoolClassroomsEntityService.update({ id: this.currentClassroom.id, coursesIds: coursesIds });
  }

  dropStudents(event: CdkDragDrop<string[]>): void {
    const studentsEmails: string[] = [];
    studentsEmails.push(...event.container.data);
    if (event.previousContainer === event.container) {
      moveItemInArray(studentsEmails, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, studentsEmails, event.previousIndex, event.currentIndex);
    }
    this.schoolClassroomsEntityService.update({ id: this.currentClassroom.id, studentsEmails });
  }
  removeStudent(student: User, i: number) {
    const studentsEmails: string[] = this.currentClassroom.studentsEmails;
    studentsEmails.splice(this.currentClassroom.studentsEmails.findIndex(s => s === student.primaryEmail), 1);
    this.schoolClassroomsEntityService.update({ ...this.currentClassroom, studentsEmails: studentsEmails });
  }
  removeCourse(course: SchoolCourse, i: number) {
    this.schoolService.removeCourseFromClassroom(this.currentClassroom.id, course.id).then(
      () => this.onClassroomEmit.emit(this.currentClassroom.id));
  }
  addStudent() {
    this.schoolService.addStudentEmailToClassroom(this.classroom.id, this.studentEmail).then(
      () => {
        this.studentEmail = '';
        this.onClassroomEmit.emit(this.currentClassroom.id)
      });
  }
}
