import { Injectable } from '@angular/core';

@Injectable()
export class TeachersService {

  constructor() { }

  /**
   * Retrive an array of Teachers in a Course
   * @param courseId Course ID (string) to query
   */
  async getTeachers(courseId: string): Promise<gapi.client.classroom.Teacher[]> {
    const response: gapi.client.Response<gapi.client.classroom.ListTeachersResponse> =
      await gapi.client.classroom.courses.teachers.list({
        courseId: courseId,
      });
    return response.result.teachers;
  }
  /**
  * Create adds a teacher on a course
  * @param teacher A Teacher Object
  */
  async addTeacher(teacher: gapi.client.classroom.Teacher) {
    const newTeacher: gapi.client.classroom.Teacher = {
      userId: teacher.userId,
    }
    const response: gapi.client.Response<gapi.client.classroom.Teacher> =
      await gapi.client.classroom.courses.teachers.create({
        courseId: teacher.courseId, resource: newTeacher
      });
    return response.result;
  }
}
