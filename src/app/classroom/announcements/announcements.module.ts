import { NgModule } from '@angular/core';

import {
  EntityDataService,
  EntityDefinitionService,
  EntityServices,
} from '@ngrx/data';
import * as fromEntity from '@rds-store/config/entity-metadata';
import * as fromAnnouncement from '@rds-store/classroom/announcement';
import { AnnouncementDataService } from '@rds-store/classroom/announcement/announcement-data.service';
import { AnnouncementEntityService } from '@rds-store/classroom/announcement/announcement-entity.service';
import { AnnouncementsRoutingModule } from './announcements-routing.module';
import { AnnouncementResolver } from './services/announcement.resolver';
import { AnnouncementsService } from './services/announcements.service';
import { AnnouncementDialogComponent } from './components/announcement-dialog/announcement-dialog.component';
import { AnnouncementResultComponent } from './components/announcement-result/announcement-result.component';
import { CourseAnnouncementsComponent } from './components/course-announcements/course-announcements.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    CourseAnnouncementsComponent,
    AnnouncementDialogComponent,
    AnnouncementResultComponent,
  ],
  exports: [
    CourseAnnouncementsComponent,
    AnnouncementDialogComponent,
    AnnouncementResultComponent,
  ],
  imports: [
    SharedModule,
    AnnouncementsRoutingModule,
  ],
  providers: [
    AnnouncementsService,
    AnnouncementEntityService,
    AnnouncementDataService,
    AnnouncementResolver,
  ],
})
export class AnnouncementsModule {
  constructor(
    eds: EntityDefinitionService,
    entityServices: EntityServices,
    announcementEntityService: AnnouncementEntityService,
    entityDataService: EntityDataService,
    announcementDataService: AnnouncementDataService
  ) {
    entityServices.registerEntityCollectionServices([
      announcementEntityService,
    ]);
    eds.registerMetadataMap(fromEntity.entityMetadata);
    entityDataService.registerService(
      fromAnnouncement.entityCollectionName,
      announcementDataService
    );
  }
}
