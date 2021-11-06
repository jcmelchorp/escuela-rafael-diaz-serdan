import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import {
  EntityDataService,
  EntityDefinitionService,
  EntityServices,
} from '@ngrx/data';

import * as fromEntity from '@rds-root/app/store/config/entity-metadata';
import * as fromAnnouncement from '@rds-root/app/store/classroom/announcement';
import { AnnouncementDataService } from '@rds-root/app/store/classroom/announcement/announcement-data.service';
import { AnnouncementEntityService } from '@rds-root/app/store/classroom/announcement/announcement-entity.service';
import { AnnouncementsRoutingModule } from './announcements-routing.module';
import { AnnouncementResolver } from './services/announcement.resolver';
import { AnnouncementsService } from './services/announcements.service';
import { AnnouncementDialogComponent } from './components/announcement-dialog/announcement-dialog.component';
import { AnnouncementResultComponent } from './components/announcement-result/announcement-result.component';
import { CourseAnnouncementsComponent } from './components/course-announcements/course-announcements.component';
import { MaterialModule } from '@rds-root/app/modules';

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
    CommonModule,
    AnnouncementsRoutingModule,
    FormsModule,
    MaterialModule,
    FlexLayoutModule,
    FontAwesomeModule,
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
