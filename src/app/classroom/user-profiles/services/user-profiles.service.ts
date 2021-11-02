import { Injectable } from '@angular/core';
import { environment } from '@rds-env/environment';
import { from } from 'rxjs';
declare var gapi: any;
@Injectable()
export class UserProfilesService {
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
    const isAuthorized = this.hasAccessScopes(googleAuth);
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

  checkTeacherRole(id: string) {
    return from(this.checkTeacher(id));
  }

  async checkTeacher(id: string): Promise<boolean> {
    const response: gapi.client.Response<gapi.client.classroom.UserProfile> =
      await gapi.client.classroom.userProfiles.get({
        userId: id,
      });
    return response.result.verifiedTeacher;
  }
  /**
   * Retrive a User profile.
   * @param userId User ID (string) to query
   */
  async getUserProfile(
    userId: string
  ): Promise<gapi.client.classroom.UserProfile> {
    const response: gapi.client.Response<gapi.client.classroom.UserProfile> =
      await gapi.client.classroom.userProfiles.get({
        userId: userId,
      });
    return response.result;
  }
  /**
   * Retrive an array of Guardians of a given User
   * @param studentId Student ID (string) to query
   */
  async getGuardians(
    studentId: string
  ): Promise<gapi.client.classroom.Guardian[]> {
    const response: gapi.client.Response<gapi.client.classroom.ListGuardiansResponse> =
      await gapi.client.classroom.userProfiles.guardians.list({
        studentId: studentId,
      });
    return response.result.guardians;
  }
  /**
   * Retrive a Guardian object of a given User
   * @param studentId Student ID (string) to query
   */
  async getGuardian(
    studentId: string,
    guardianId: string
  ): Promise<gapi.client.classroom.Guardian> {
    const response: gapi.client.Response<gapi.client.classroom.Guardian> =
      await gapi.client.classroom.userProfiles.guardians.get({
        studentId: studentId,
        guardianId: guardianId,
      });
    return response.result;
  }
  /**
   * Removes Guardian object of a given User
   * @param studentId Student ID (string) to query
   */
  async removeGuardian(
    studentId: string,
    guardianId: string
  ): Promise<gapi.client.classroom.Guardian> {
    const response: gapi.client.Response<gapi.client.classroom.Guardian> =
      await gapi.client.classroom.userProfiles.guardians.delete({
        studentId: studentId,
        guardianId: guardianId,
      });
    return response.result;
  }
}
