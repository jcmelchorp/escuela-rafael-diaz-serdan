import { Component, Input } from "@angular/core";
import { Enrollment } from "@rds-school/enrollments/models/enrollment.model";
import { AssignedCourse } from "@rds-school/school-courses/models/school-course.model";
import { AssignedCoursesEntityService } from "@rds-store/school/assigned-courses/assigned-courses-entity.service";
import { EnrollmentsEntityService } from "@rds-store/school/enrollments/enrollments-entity.service";
import { SchoolCoursesEntityService } from "@rds-store/school/school-courses/school-courses-entity.service";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

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
            const assignedCourse: Partial<AssignedCourse> = {
              teacherId: '',
              studentIds: [],

            };
            this.assignedCoursesEntityService.add(assignedCourse as AssignedCourse).subscribe(assigned => {
              newCourses.push({ [assigned.id]: assigned });
            });

            return assignedCourse;
          })
        ))
      .subscribe(courses => this.enrollmentsEntityService.update({ id: enroll.id, assignedCourses: courses as AssignedCourse[] }));
  }
}
