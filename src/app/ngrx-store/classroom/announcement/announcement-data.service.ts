import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';

import { AnnouncementsService } from '@rds-classroom/announcements/services/announcements.service';

import { from, Observable } from 'rxjs';

import * as fromAnnouncement from './'
@Injectable()
export class AnnouncementDataService extends DefaultDataService<gapi.client.classroom.Announcement> {
  constructor(
    http: HttpClient,
    httpUrlGenerator: HttpUrlGenerator,
    private announcementsService: AnnouncementsService
  ) {
    super(fromAnnouncement.entityCollectionName, http, httpUrlGenerator);
  }
  getWithQuery(courseId: string): Observable<gapi.client.classroom.Announcement[]> {
    return from(
      this.announcementsService.getAnnouncements(courseId)
    );
  }
}
