import { Injectable } from '@angular/core';

import { ModifyIndividualStudentsOptions } from '@rds-classroom/models/classroom.model';
import { AssigneeMode, LateValues, SubmissionState } from '@rds-classroom/models/classroom.enum';

@Injectable()
export class CourseWorksService {

  constructor() { }
  async getCourseWorks(courseId: string): Promise<gapi.client.classroom.CourseWork[]> {
    const response: gapi.client.Response<gapi.client.classroom.ListCourseWorkResponse> =
      await gapi.client.classroom.courses.courseWork.list({
        courseId: courseId,
      });
    return response.result.courseWork;
  }

  async getCourseWork(id: string, courseId: string): Promise<gapi.client.classroom.CourseWork> {
    const response: gapi.client.Response<gapi.client.classroom.CourseWork> =
      await gapi.client.classroom.courses.courseWork.get({
        id: id,
        courseId: courseId,
      });
    return response.result;
  }

  async removeCourseWork(id: string, courseId: string): Promise<gapi.client.classroom.CourseWork> {
    const response: gapi.client.Response<gapi.client.classroom.CourseWork> =
      await gapi.client.classroom.courses.courseWork.delete({
        id: id,
        courseId: courseId,
      });
    return response.result;
  }

  async createCourseWork(courseId: string, courseWork: gapi.client.classroom.CourseWork): Promise<gapi.client.classroom.CourseWork> {
    const response: gapi.client.Response<gapi.client.classroom.CourseWork> =
      await gapi.client.classroom.courses.courseWork.create({
        courseId: courseId,
        resource: courseWork
      });
    return response.result;
  }
  async updateCourseWork(id: string, courseId: string, courseWork: gapi.client.classroom.CourseWork): Promise<gapi.client.classroom.CourseWork> {
    const response: gapi.client.Response<gapi.client.classroom.CourseWork> =
      await gapi.client.classroom.courses.courseWork.patch({
        id: id,
        courseId: courseId,
        resource: courseWork
      });
    return response.result;
  }
  async modifyAssigneesCourseWork(id: string, courseId: string, assigneeMode: AssigneeMode, modifyIndividualStudentsOptions: ModifyIndividualStudentsOptions): Promise<gapi.client.classroom.CourseWork> {
    const response: gapi.client.Response<gapi.client.classroom.CourseWork> =
      await gapi.client.classroom.courses.courseWork.modifyAssignees({
        id: id,
        courseId: courseId,
        resource: {}
      });
    return response.result;
  }
  async getTopics(courseId: string): Promise<gapi.client.classroom.Topic[]> {
    const response: gapi.client.Response<gapi.client.classroom.ListTopicResponse> =
      await gapi.client.classroom.courses.topics.list({
        courseId: courseId,
      });
    return response.result.topic;
  }
  async getTopic(id: string, courseId: string): Promise<gapi.client.classroom.Topic> {
    const response: gapi.client.Response<gapi.client.classroom.Topic> =
      await gapi.client.classroom.courses.topics.get({
        id: id,
        courseId: courseId,
      });
    return response.result;
  }
  async removeTopic(id: string, courseId: string): Promise<gapi.client.classroom.Topic> {
    const response: gapi.client.Response<gapi.client.classroom.Topic> =
      await gapi.client.classroom.courses.topics.delete({
        id: id,
        courseId: courseId,
      });
    return response.result;
  }
  async updateTopic(id: string, courseId: string, topic: gapi.client.classroom.Topic): Promise<gapi.client.classroom.Topic> {
    const response: gapi.client.Response<gapi.client.classroom.Topic> =
      await gapi.client.classroom.courses.topics.patch({
        id: id,
        courseId: courseId,
        resource: topic
      });
    return response.result;
  }

  async getStudentSubmissions(courseId: string, courseWorkId: string, userId?: string, isLate?: LateValues, states?: SubmissionState[]): Promise<gapi.client.classroom.StudentSubmission[]> {
    const response: gapi.client.Response<gapi.client.classroom.ListStudentSubmissionsResponse> =
      await gapi.client.classroom.courses.courseWork.studentSubmissions.list({
        courseWorkId: courseWorkId,
        courseId: courseId,
        userId: userId,
        late: isLate.toString(),
        states: states.toString(),
      });
    return response.result.studentSubmissions;
  }
  async getStudentSubmission(courseId: string, courseWorkId: string, id: string): Promise<gapi.client.classroom.StudentSubmission> {
    const response: gapi.client.Response<gapi.client.classroom.StudentSubmission> =
      await gapi.client.classroom.courses.courseWork.studentSubmissions.get({
        courseWorkId: courseWorkId,
        courseId: courseId,
        id: id,
      });
    return response.result;
  }
  async gradeStudentSubmission(courseId: string, courseWorkId: string, id: string, draftGrade?: number, assignedGrade?: number): Promise<gapi.client.classroom.StudentSubmission> {
    const submissionPatched: gapi.client.classroom.StudentSubmission = {
      draftGrade: draftGrade,
      assignedGrade: assignedGrade
    }
    const response: gapi.client.Response<gapi.client.classroom.StudentSubmission> =
      await gapi.client.classroom.courses.courseWork.studentSubmissions.patch({
        courseWorkId: courseWorkId,
        courseId: courseId,
        id: id,
        resource: submissionPatched
      });
    return response.result;
  }
}
