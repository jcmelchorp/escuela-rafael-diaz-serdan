import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Enrollment } from '../../models/enrollment.model';
import { EnrollmentsEntityService } from '@rds-store/school/enrollments/enrollments-entity.service';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap, tap } from 'rxjs/operators';
import { EnrollmentDialogComponent } from '../../components';
import { MatDialog } from '@angular/material/dialog';
import { EnrollmentsService } from '../../services/enrollments.service';
import { SchoolCoursesEntityService } from '../../../store/school/school-courses/school-courses-entity.service';
import { SchoolCourse } from '../../models/school-course.model';
import { Update } from '@ngrx/entity';
import { AssignedCoursesEntityService } from '@rds-store/school/assigned-courses/assigned-courses-entity.service';
import { AssignedCourse } from '@rds-school/models/assigned-course.model';

@Component({
  selector: 'app-enrollment',
  templateUrl: './enrollment.component.html',
  styleUrls: ['./enrollment.component.scss'],
})
export class EnrollmentComponent {
  @Input() enrollment: Enrollment;
  loading$: Observable<boolean>;
  loaded$: Observable<boolean>;
  constructor(
    private enrollmentsEntityService: EnrollmentsEntityService,
    private schoolCoursesEntityService: SchoolCoursesEntityService,
    private assignedCoursesEntityService: AssignedCoursesEntityService,
  ) {
    this.loaded$ = this.schoolCoursesEntityService.loaded$;
  }

  enrollCourses(enroll: Enrollment) {
    const newCourses = [];
    this.schoolCoursesEntityService.keys$
      .pipe(
        map((keys: string[]) =>
          keys.map(key => {
            const assignedCourse: AssignedCourse = {
              courseId: key,
              teacherId: '',
              studentIds: []
            };
            this.assignedCoursesEntityService.add(assignedCourse).subscribe(assigned => {
              newCourses.push({ [assigned.id]: assigned });
            });

            return assignedCourse;
          })
        ))
      .subscribe(courses => this.enrollmentsEntityService.update({ id: enroll.id, assignedCourses: courses }));
  }
}
