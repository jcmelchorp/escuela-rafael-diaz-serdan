import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { SubscriptionService } from '@rds-shared/services';

@Component({
  selector: 'app-notes-edit',
  templateUrl: './notes-edit.component.html',
  styleUrls: ['./notes-edit.component.scss'],
})
export class NotesEditComponent implements OnInit {
  courseId: string;
  grade: string;
  suspended: boolean;
  constructor(
    private route: ActivatedRoute,
    //private teachersCourses: TeachersCoursesService,
    //private roomService: RoomService,
    private formBuilder: FormBuilder,
    private subscriptionService: SubscriptionService
  ) {
    this.courseId = this.route.snapshot.params.courseId;
    this.grade = this.route.snapshot.queryParams.grade;
    this.suspended = this.route.snapshot.queryParams.suspended;
  }

  ngOnInit() {}
  ngOnDestroy(): void {
    this.subscriptionService.unsubscribeComponent$;
  }
}
