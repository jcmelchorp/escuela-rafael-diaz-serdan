import { Injectable } from '@angular/core';

import { QueryParams } from '@ngrx/data';

import { environment } from '@rds-env/environment';
@Injectable()
export class CoursesService {
  constructor() {
    this.handleClassroomLoad();
  }
  private hasAccessScopes(googleAuth: gapi.auth2.GoogleAuth): boolean {
    return (
      googleAuth &&
      googleAuth.currentUser
        .get()
        .hasGrantedScopes(environment.gapi.classroomScopes)
    );
  }
  async handleClassroomLoad(): Promise<void> {
    // Retrieve the GoogleUser object for the current user.
    const googleAuth: gapi.auth2.GoogleAuth = gapi.auth2.getAuthInstance();
    const googleUser: gapi.auth2.GoogleUser = googleAuth.currentUser.get();
    const isAuthorized = googleUser.hasGrantedScopes(
      environment.gapi.classroomScopes
    );
    if (!isAuthorized) {
      const option: gapi.auth2.SigninOptionsBuilder =
        new gapi.auth2.SigninOptionsBuilder();
      option.setScope(environment.gapi.classroomScopes);
      await googleUser.grant(option).then(
        (success) => {
          //alert(JSON.stringify({ message: "success", value: success }));
        },
        (fail) => {
          alert(JSON.stringify({ message: 'fail', value: fail }));
        }
      );
    }
    gapi.client.load('classroom', 'v1', () => {
      // alert('loaded classroom');
    });
  }
  /**
   * Retrive an array of courses according to permissions access user logged in Google Classroom
   *
   * @param studentId User Identifier from courses's list which is enrolled as student.
   * @param teacherId User Identifier from courses's list which is enrolled as teacher.
   * @param courseStates The course states from te courses to be query.
   * @returns Course Array
   */
  async getCourses(
    queryParams?: QueryParams
  ): Promise<gapi.client.classroom.Course[]> {
    const response: gapi.client.Response<gapi.client.classroom.ListCoursesResponse> =
      await gapi.client.classroom.courses.list({ ...queryParams });
    return response.result.courses;
  }
  async getCourse(courseId: string): Promise<gapi.client.classroom.Course> {
    const response: gapi.client.Response<gapi.client.classroom.Course> =
      await gapi.client.classroom.courses.get({
        id: courseId,
      });
    return response.result;
  }

  async getCourseWorkMaterials(
    courseId: string
  ): Promise<gapi.client.classroom.CourseWorkMaterial[]> {
    const response: gapi.client.Response<gapi.client.classroom.ListCourseWorkMaterialResponse> =
      await gapi.client.classroom.courses.courseWorkMaterials.list({
        courseId: courseId,
      });
    return response.result.courseWorkMaterial;
  }

  async getAliases(
    courseId: string
  ): Promise<gapi.client.classroom.CourseAlias[]> {
    const response: gapi.client.Response<gapi.client.classroom.ListCourseAliasesResponse> =
      await gapi.client.classroom.courses.aliases.list({
        courseId: courseId,
      });
    return response.result.aliases;
  }

  /**
   * Create a courses in Google Classroom
   *
   * @param resource Course object to be created.
   */
  async createCourse(
    course: gapi.client.classroom.Course
  ): Promise<gapi.client.classroom.Course> {
    const response: gapi.client.Response<gapi.client.classroom.Course> =
      await gapi.client.classroom.courses.create({
        resource: course,
      });
    return response.result;
  }
  /**
   * Update a courses in Google Classroom
   *
   * @param resource Course object to be created.
   */
  async updateCourse(
    courseId: string | number,
    course: gapi.client.classroom.Course
  ): Promise<gapi.client.classroom.Course> {
    const response: gapi.client.Response<gapi.client.classroom.Course> =
      await gapi.client.classroom.courses.update({
        id: courseId.toString(),
        resource: course,
      });
    return response.result;
  }

  /**
   * Removes a teacher from a given course
   * @param courseId
   * @param email
   */
  async removeTeacher(
    courseId: string,
    email: string
  ): Promise<gapi.client.classroom.Teacher> {
    let response: gapi.client.Response<gapi.client.classroom.Teacher> =
      await gapi.client.classroom.courses.students.delete({
        userId: email,
        courseId,
      });
    return response.result;
  }

  async createInvitation(
    invitation: gapi.client.classroom.Invitation
  ): Promise<gapi.client.classroom.Invitation> {
    const response: gapi.client.Response<gapi.client.classroom.Invitation> =
      await gapi.client.classroom.invitations.create({
        resource: invitation,
      });
    return response.result;
  }

  async getInvitations(
    userId: string,
    courseId: string
  ): Promise<gapi.client.classroom.Invitation[]> {
    const response: gapi.client.Response<gapi.client.classroom.ListInvitationsResponse> =
      await gapi.client.classroom.invitations.list({
        userId: userId,
        courseId: courseId,
      });
    return response.result.invitations;
  }
}
