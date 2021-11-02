import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class AnnouncementsService {
  constructor() {}
  async getAnnouncements(
    courseId: string
  ): Promise<gapi.client.classroom.Announcement[]> {
    const response: gapi.client.Response<gapi.client.classroom.ListAnnouncementsResponse> =
      await gapi.client.classroom.courses.announcements.list({
        courseId: courseId,
      });
    return response.result.announcements;
  }
  /**
   * Make an announcement on a given course in Google Classroom
   *
   * @param courseId Identifier of course to be announce.
   * @param announcement Announcement object to send.
   */
  async createAnnouncement(
    announcement: gapi.client.classroom.Announcement,
    courseId: string
  ) {
    const response: gapi.client.Response<gapi.client.classroom.Announcement> =
      await gapi.client.classroom.courses.announcements.create({
        courseId: courseId,
        resource: announcement,
      });
    return response.result;
  }
}
