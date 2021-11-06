import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  EntityDataService,
  EntityDefinitionService,
  EntityServices,
} from '@ngrx/data';
import * as fromCourseWork from '@rds-root/app/store/classroom/course-work';
import * as fromStudentSubmission from '@rds-root/app/store/classroom/student-submission';
import * as fromTopic from '@rds-root/app/store/classroom/topic';
import { StudentSubmissionDataService } from '@rds-root/app/store/classroom/student-submission/student-submission-data.service';
import { StudentSubmissionEntityService } from '@rds-root/app/store/classroom/student-submission/student-submission-entity.service';
import { CourseWorkDataService } from '@rds-root/app/store/classroom/course-work/course-work-data-service.service';
import { CourseWorkEntityService } from '@rds-root/app/store/classroom/course-work/course-work-entity-service.service';
import { TopicDataService } from '@rds-root/app/store/classroom/topic/topic-data.service';
import { TopicEntityService } from '@rds-root/app/store/classroom/topic/topic-entity.service';

import { CourseWorksRoutingModule } from './course-works-routing.module';

import { CourseWorksResolver } from './services/course-works.resolver';
import { CourseWorksService } from './services/course-works.service';
import { StudentSubmissionsResolver } from './services/student-submissions.resolver';
import { TopicsResolver } from './services/topics.resolver';
import { CourseWorkComponent } from './components/course-work/course-work.component';
import * as fromEntity from '@rds-root/app/store/config/entity-metadata';
import { MaterialModule } from '@rds-root/app/modules';

@NgModule({
  declarations: [CourseWorkComponent],
  exports: [CourseWorkComponent],
  imports: [
    CommonModule,
    CourseWorksRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    FontAwesomeModule,
  ],
  providers: [
    CourseWorksService,
    CourseWorkEntityService,
    CourseWorkDataService,
    CourseWorksResolver,
    TopicDataService,
    TopicEntityService,
    TopicsResolver,
    StudentSubmissionDataService,
    StudentSubmissionEntityService,
    StudentSubmissionsResolver,
  ],
})
export class CourseWorksModule {
  constructor(
    eds: EntityDefinitionService,
    entityServices: EntityServices,
    courseWorkEntityService: CourseWorkEntityService,
    entityDataService: EntityDataService,
    courseWorkDataService: CourseWorkDataService,
    topicDataService: TopicDataService,
    topicEntityService: TopicEntityService,
    studentSubmissionEntityService: StudentSubmissionEntityService,
    studentSubmissionDataService: StudentSubmissionDataService
  ) {
    entityServices.registerEntityCollectionServices([
      courseWorkEntityService,
      topicEntityService,
      studentSubmissionEntityService,
    ]);
    eds.registerMetadataMap(fromEntity.entityMetadata);
    entityDataService.registerService(
      fromTopic.entityCollectionName,
      topicDataService
    );
    entityDataService.registerService(
      fromStudentSubmission.entityCollectionName,
      studentSubmissionDataService
    );
    entityDataService.registerService(
      fromCourseWork.entityCollectionName,
      courseWorkDataService
    );
  }
}
