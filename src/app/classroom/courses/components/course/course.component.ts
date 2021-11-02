import { ActivatedRoute, Router } from '@angular/router';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import {
  faAt,
  faBellSlash,
  faBriefcase,
  faBullhorn,
  faEdit,
  faHouseUser,
  faPaperPlane,
  faUserCheck,
  faUserGraduate,
  faUserPlus,
  faUserTie,
  faUserTimes,
} from '@fortawesome/free-solid-svg-icons';
import { faGoogleDrive } from '@fortawesome/free-brands-svg-icons';

import { CourseEntityService } from '@rds-store/classroom/course/course-entity.service';
import { TeacherEntityService } from '@rds-store/classroom/teacher/teacher-entity.service';

import { UserProfilesService } from '@rds-classroom/user-profiles/services/user-profiles.service';

import { LayoutService } from '@rds-core/services/layout.service';

import { NavLink } from '@rds-shared/models/nav-link';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CourseDialogComponent } from '../course-dialog/course-dialog.component';
import { CourseUserDialogComponent } from '../course-user-dialog/course-user-dialog.component';
import { CoursesService } from '../../services/courses.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseComponent implements OnInit {
  isHandset$: Observable<boolean>;
  course$: Observable<gapi.client.classroom.Course>;
  courses$: Observable<gapi.client.classroom.Course[]>;
  teachers$: Observable<gapi.client.classroom.Teacher[]>;
  owner$: Observable<gapi.client.classroom.Teacher>;
  courseId: string;
  ownerId: string;
  faHouseUser = faHouseUser;
  faBellSlash = faBellSlash;
  faBriefcase = faBriefcase;
  faAt = faAt;
  faEdit = faEdit;
  faPaperPlane = faPaperPlane;
  faGoogleDrive = faGoogleDrive;
  faUserCheck = faUserCheck;
  faUserPlus = faUserPlus;
  faUserTimes = faUserTimes;
  course: gapi.client.classroom.Course;
  teachers: gapi.client.classroom.Teacher[];
  owner: gapi.client.classroom.Teacher;
  linkText: boolean = false;
  courseLinks: NavLink[] = [
    { name: 'Profesores', route: 'teachers', icon: faUserTie },
    { name: 'Alumnos', route: 'students', icon: faUserGraduate },
    { name: 'Trabajos', route: 'courseworks', icon: faBriefcase },
    { name: 'Avisos', route: 'announcements', icon: faBullhorn },
  ];
  activeLinkIndex = -1;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private teacherEntityService: TeacherEntityService,
    private courseEntityService: CourseEntityService,
    private coursesService: CoursesService,
    private userProfilesService: UserProfilesService,
    private layoutService: LayoutService,
    private dialog: MatDialog
  ) {
    this.isHandset$ = this.layoutService.isHandset$;
    this.courseId = this.route.snapshot.paramMap.get('courseId');
    this.course$ = this.courseEntityService.entities$.pipe(
      map((courses) => {
        this.course = courses.find((course) => course.id == this.courseId);
        this.ownerId = this.course.ownerId;
        return courses.find((course) => course.id == this.courseId);
      })
    );
    this.owner$ = this.teacherEntityService.entities$.pipe(
      map((teachers) =>
        teachers
          .filter((x) => x.courseId == this.courseId)
          .find((y) => y.userId == this.ownerId)
      )
    );
  }
  ngOnInit() {
    this.router.events.subscribe((res) => {
      this.activeLinkIndex = this.courseLinks.indexOf(
        this.courseLinks.find((tab) => tab.route === '.' + this.router.url)
      );
    });
  }
  reload() { }
  openCourseDialog(course: gapi.client.classroom.Course) {
    const dialogRef = this.dialog.open(CourseDialogComponent, {
      minWidth: '450px',
      minHeight: '550px',
      data: { ...course, isNew: false },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const patchCourse: gapi.client.classroom.Course = {
          id: result.id,
          name: result.name,
          section: result.section,
          room: result.room,
          guardiansEnabled: result.guardiansEnabled,
          courseState: result.courseState,
          description: result.description,
          descriptionHeading: result.descriptionHeading,
        };
        this.courseEntityService.update(patchCourse);
      }
    });
  }
  openAddUserDialog(course?: gapi.client.classroom.Course) {
    const dialogRef = this.dialog.open(CourseUserDialogComponent, {
      width: '450px',
      data: { ...course, mail: 'me', isTeacher: false },
    });
    dialogRef.afterClosed().subscribe(async (result) => {
      if (result) {
        const profile = await this.userProfilesService.getUserProfile(
          result.mail
        );
        const preTeacher: gapi.client.classroom.Invitation = {
          userId: result.mail,
          courseId: result.id,
          role: result.isTeacher ? 'TEACHER' : 'STUDENT',
        };
        this.coursesService
          .createInvitation(preTeacher)
          .then((success) =>
            console.log(
              'invitation successfully created for ' +
              profile.name.givenName +
              ' as ' +
              success.role
            )
          );
        //const newTeacher = this.teacherEntityService.add(preTeacher)
        //const newTeacher = this.teachersService.addTeacher(result.id, result.mail)
        //this.teacherEntityService.add(teacher);
      }
    });
  }
}
