import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { faBlind } from '@fortawesome/free-solid-svg-icons';

import { TeacherEntityService } from '@rds-store/classroom/teacher/teacher-entity.service';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-course-teachers',
  templateUrl: './course-teachers.component.html',
  styleUrls: ['./course-teachers.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseTeachersComponent implements OnInit {
  teachers$: Observable<gapi.client.classroom.Teacher[]>;
  courseId: string;
  isLoading$: Observable<boolean>;
  faBlind = faBlind;
  constructor(
    private route: ActivatedRoute,
    private teacherEntityService: TeacherEntityService
  ) {
    this.isLoading$ = this.teacherEntityService.loading$;
    this.courseId = this.route.parent.parent.snapshot.paramMap.get('courseId');
    this.teachers$ = this.teacherEntityService.entities$.pipe(
      map((teachers) => {
        if (!teachers) {
          this.teacherEntityService.getWithQuery(this.courseId);
        }
        return teachers.filter((x) => x.courseId == this.courseId);
      })
    );
  }

  ngOnInit(): void { }
}
