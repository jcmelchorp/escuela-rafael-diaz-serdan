import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { faBlind } from '@fortawesome/free-solid-svg-icons';

import { StudentSubmissionEntityService } from '@rds-store/classroom/student-submission/student-submission-entity.service';
import { TopicEntityService } from '@rds-store/classroom/topic/topic-entity.service';
import { CourseWorkEntityService } from '@rds-store/classroom/course-work/course-work-entity-service.service';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-course-work',
  templateUrl: './course-work.component.html',
  styleUrls: ['./course-work.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseWorkComponent implements OnInit {
  courseWorks$: Observable<gapi.client.classroom.CourseWork[]>;
  topics$: Observable<gapi.client.classroom.Topic[]>;
  courseTopics: gapi.client.classroom.Topic[];
  courseId: string;
  isLoading$: Observable<boolean>;
  faBlind = faBlind;
  constructor(
    private route: ActivatedRoute,
    private courseWorkEntityService: CourseWorkEntityService,
    private topicEntityService: TopicEntityService,
    private studentSubmissionEntityService: StudentSubmissionEntityService
  ) {
    this.isLoading$ = this.courseWorkEntityService.loading$;
    this.courseId = this.route.parent.parent.snapshot.paramMap.get('courseId');
    this.courseWorks$ = this.courseWorkEntityService.entities$.pipe(
      map(courseWorks => {
        if (!courseWorks) {
          this.courseWorkEntityService.getWithQuery(this.courseId);
        }
        return courseWorks.filter(x => x.courseId == this.courseId);
      })
    );
    this.topics$ = this.topicEntityService.entities$.pipe(
      map(topics => {
        if (!topics) {
          this.topicEntityService.getWithQuery(this.courseId);
        }
        this.courseTopics = topics.filter(x => x.courseId == this.courseId);
        return this.courseTopics;
      })
    );
  }

  ngOnInit(): void {

  }
}

