import { CourseWorkType, GradeChangeType, Permission, SharedMode, State, SubmissionState } from '@rds-classroom/models/classroom.enum'

/** Models not in GAPI */
export interface Material {
  form: Form;
  youtubeVideo: YouTubeVideo;
  link: Link;
  driveFile: SharedDriveFile;
}
export interface Assigment {
  studentWorkFolder: DriveFolder;
}
export interface Date {
  year: number;
  month: number;
  day: number;
}
export interface GlobalPermissions {
  permission: Permission;
}
export interface StudentSubmission {
  courseId: string;
  courseWorkId: string;
  id: string;
  userId: string;
  creationTime: string;
  updateTime: string;
  state: SubmissionState;
  late: boolean;
  draftGrade: number;
  assignedGrade: number;
  alternateLink: string;
  courseWorkType: CourseWorkType;
  associatedWithDeveloper: boolean;
  submissionHistory: SubmissionHistory[];
}
export interface SubmissionHistory {
  // Union field type can be only one of the following:
  stateHistory: StateHistory;
  gradeHistory: GradeHistory;
  // End of list of possible types for union field type.
}

export interface StateHistory {
  state: SubmissionState
  stateTimestamp: string,
  actorUserId: string
}
export interface GradeHistory {
  pointsEarned: number;
  maxPoints: number;
  gradeTimestamp: string;
  actorUserId: string;
  gradeChangeType: GradeChangeType;
}

export interface Name {
  givenName: string;
  familyName: string;
  fullName: string;
}

export interface SharedDriveFile {
  driveFile: DriveFile;
  shareMode: SharedMode;

}
export interface DriveFolder {
  id: string;
  title: string;
  alternateLink: string;
}
export interface CourseMaterialSet {
  title: string;
  materials: CourseMaterial[];
}
export interface CourseMaterial {
  driveFile: DriveFile;
  youTubeVideo: YouTubeVideo;
  link: Link;
  form: Form;
}
export interface YouTubeVideo {
  id: string;
  title: string;
  alternateLink: string;
  thumbnailUrl: string;
}
export interface DriveFile {
  id: string;
  title: string;
  alternateLink: string;
  thumbnailUrl: string;
}
export interface Link {
  url: string;
  title: string;
  thumbnailUrl: string;
}
export interface Form {
  formUrl: string;
  responseUrl: string;
  title: string;
  thumbnailUrl: string;
}
export interface ModifyIndividualStudentsOptions {
  addStudentIds: string[];
  removeStudentIds: string[];
}

export interface RoleSelectorId {
  studentId?: string;
  teacherId?: string
}
