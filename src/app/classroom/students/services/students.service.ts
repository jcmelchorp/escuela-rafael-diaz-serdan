import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  constructor() { }
  async getStudents(courseId: string): Promise<gapi.client.classroom.Student[]> {
    const response: gapi.client.Response<gapi.client.classroom.ListStudentsResponse> =
      await gapi.client.classroom.courses.students.list({
        courseId: courseId,
      });
    return response.result.students;
  }
  async getStudent(courseId: string, userId: string): Promise<gapi.client.classroom.Student> {
    const response: gapi.client.Response<gapi.client.classroom.Student> =
      await gapi.client.classroom.courses.students.get({
        courseId: courseId,
        userId: userId
      });
    return response.result;
  }
  /**
  * Adds a student to a given course
  * @param courseId
  * @param email
  */
  async createStudent(student: gapi.client.classroom.Student): Promise<gapi.client.classroom.Student> {
    const response: gapi.client.Response<gapi.client.classroom.Student> =
      await gapi.client.classroom.courses.students.create({
        resource: student,
        courseId: student.courseId
      });
    return response.result;
  }
  /**
   * Removes a student from a given course
   * @param courseId
   * @param email
   */
  async removeStudent(courseId: string, userId: string): Promise<gapi.client.classroom.Student> {
    const response: gapi.client.Response<gapi.client.classroom.Student> =
      await gapi.client.classroom.courses.students.delete({ userId: userId, courseId: courseId });
    return response.result;
  }
}
