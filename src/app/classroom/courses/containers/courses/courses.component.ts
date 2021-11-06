import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { faBullhorn, faListAlt, faPlus } from '@fortawesome/free-solid-svg-icons';

import { CourseEntityService } from '@rds-root/app/store/classroom/course/course-entity.service';

import { Observable } from 'rxjs';

import { CourseDialogComponent } from '../../components/course-dialog/course-dialog.component';
import { AnnouncementsService } from '../../../announcements/services/announcements.service';
import { AnnouncementDialogComponent } from '../../../announcements/components/announcement-dialog/announcement-dialog.component';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoursesComponent implements OnInit {
  courses: gapi.client.classroom.Course[];
  courses$: Observable<gapi.client.classroom.Course[]>;
  faPlus = faPlus;
  faListAlt = faListAlt;
  faBullhorn = faBullhorn;
  constructor(
    private dialog: MatDialog,
    private announcementsService: AnnouncementsService,
    private courseEntityService: CourseEntityService,
  ) { }
  ngOnInit(): void { }

  openCreateCourseDialog() {
    let course: gapi.client.classroom.Course = {};
    const dialogRef = this.dialog.open(CourseDialogComponent, {
      minWidth: '450px',
      minHeight: '550px',
      data: { course, isNew: true }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.courseEntityService.add(result.course, { isOptimistic: false });
      }
    });
  }

  openCreateAnnouncementDialog() {
    const newAnnouncement: gapi.client.classroom.Announcement = {
      text: '',
      materials: [],
      state: 'DRAFT',
      assigneeMode: 'ALL_STUDENTS'
    };
    const dialogRef = this.dialog.open(AnnouncementDialogComponent, {
      minWidth: '450px',
      data: { newAnnouncement, isNew: true, section: '' }
    });
    dialogRef.afterClosed().subscribe(async result => {
      if (result) {
        this.courseEntityService.keys$.subscribe((courseIds: string[]) => {
          courseIds.map(async (courseId: string) => {
            const response = await this.announcementsService.createAnnouncement(
              result.newAnnouncement as gapi.client.classroom.Announcement, courseId);
          });
        });
      }
    });
  }
}
