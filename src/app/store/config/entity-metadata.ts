import {
  EntityMetadataMap,
  EntityDataModuleConfig,
  PropsFilterFnFactory,
} from '@ngrx/data';
import { User } from '@rds-auth/models/user.model';
import * as fromAccount from '@rds-store/accounts';
import * as fromAccountDomain from '@rds-store/accounts-domain';
import * as fromSchoolCourses from '@rds-store/school/school-courses';
import * as fromAnnouncement from '@rds-store/classroom/announcement';
import * as fromCourse from '@rds-store/classroom/course';
import * as fromCourseWork from '@rds-store/classroom/course-work';
import * as fromAssignedCourses from '@rds-store/school/assigned-courses';
import * as fromGuardian from '@rds-store/classroom/guardian';
import * as fromScores from '@rds-store/scores';
import * as fromStudent from '@rds-store/classroom/student';
import * as fromTeacher from '@rds-store/classroom/teacher';
import * as fromTopic from '@rds-store/classroom/topic';
import * as fromUserProfile from '@rds-store/classroom/user-profile';
//import * as fromGroup from '@rds-admin/state/group';
import * as fromStudentSubmission from '@rds-store/classroom/student-submission';
import { SchoolCourse } from '@rds-school/school-courses/models/school-course.model';
import { AssignedCourse } from '@rds-school/school-courses/models/school-course.model';
import { AccountDomain } from '@rds-accounts/models/account-domain.model';
import { Score } from '@rds-profile/models/score.model';


export const entityMetadata: EntityMetadataMap = {
  [fromAccountDomain.entityCollectionName]: {
    filterFn: (entities: AccountDomain[], { name/* , grade, role */ }: Partial<AccountDomain>) =>
      entities
        .filter((e) =>
          name && e.name && e.name.fullName
            ? e.name.fullName
              .toLocaleLowerCase()
              .includes(`${name.fullName!.toLocaleLowerCase()}`)
            : true
        )
       /*  .filter((e) => (grade ? e.grade === grade : true))
        .filter((e) => (role ? e.role === role : true)), */,
    entityDispatcherOptions: {
      optimisticAdd: false,
      optimisticUpdate: false,
      optimisticSaveEntities: false,
    },
  },
  [fromAccount.entityCollectionName]: {
    filterFn: (entities: User[], { name, primaryEmail, curp }: Partial<User>) =>
      entities
        .filter((e) =>
          name && e.name ? e.name.fullName.toLowerCase().includes(name.fullName) : true
        )
        .filter((e) => (primaryEmail ? e.primaryEmail.includes(primaryEmail) : true))
        .filter((e) => (curp ? e.curp.includes(curp) : true)),
    selectId: (user: User) => user.id,
    entityDispatcherOptions: {
      optimisticAdd: false,
      optimisticUpdate: false,
      optimisticSaveEntities: false,
    },
  },
  [fromSchoolCourses.entityCollectionName]: {
    filterFn: (entities: SchoolCourse[], { name, grade, description }: Partial<SchoolCourse>) =>
      entities
        .filter((e) => (name ? e.name === name : true))
        .filter((e) => (grade ? e.grade === grade : true))
        .filter((e) => (description ? e.description === description : true)),
    selectId: (schoolCourse: SchoolCourse) => schoolCourse.id,
    entityDispatcherOptions: {
      optimisticAdd: false,
      optimisticUpdate: false,
      optimisticSaveEntities: false,
      optimisticDelete: false,
      optimisticUpsert: false,
    },
  },
  [fromAssignedCourses.entityCollectionName]: {
    filterFn: (entities: AssignedCourse[], { name, grade, description }: Partial<AssignedCourse>) =>
      entities
        .filter((e) => (name ? e.name === name : true))
        .filter((e) => (grade ? e.grade === grade : true))
        .filter((e) => (description ? e.description === description : true)),
    selectId: (assignedCourse: AssignedCourse) => assignedCourse.id,
    entityDispatcherOptions: {
      optimisticAdd: false,
      optimisticUpdate: false,
      optimisticSaveEntities: false,
      optimisticDelete: false,
      optimisticUpsert: false,
    },
  },
  [fromScores.entityCollectionName]: {
    entityDispatcherOptions: {
      optimisticAdd: false,
      optimisticUpdate: false,
      optimisticSaveEntities: false,
    },
    selectId: (score: Score) => score.id,
  },
  [fromCourse.entityCollectionName]: {
    entityDispatcherOptions: {
      optimisticAdd: true,
      optimisticUpdate: true,
      optimisticSaveEntities: true,
    },
    selectId: (course: gapi.client.classroom.Course) => course.id,
  },
  [fromStudent.entityCollectionName]: {
    entityDispatcherOptions: {
      optimisticAdd: true,
      optimisticUpdate: true,
    },
    selectId: (student: gapi.client.classroom.Student) => student.userId,
  },
  [fromTeacher.entityCollectionName]: {
    entityDispatcherOptions: {
      optimisticAdd: true,
      optimisticUpdate: true,
    },
    selectId: (teacher: gapi.client.classroom.Teacher) => teacher.userId,
  },
  [fromCourseWork.entityCollectionName]: {
    entityDispatcherOptions: {
      optimisticAdd: true,
      optimisticUpdate: true,
    },
    selectId: (courseWork: gapi.client.classroom.CourseWork) => courseWork.id,
  },
  [fromUserProfile.entityCollectionName]: {
    entityDispatcherOptions: {
      optimisticAdd: true,
      optimisticUpdate: true,
      optimisticSaveEntities: true,
    },
    selectId: (profile: gapi.client.classroom.UserProfile) => profile.id,
  },
  [fromGuardian.entityCollectionName]: {
    entityDispatcherOptions: {
      optimisticAdd: true,
      optimisticUpdate: true,
      optimisticSaveEntities: true,
    },
    selectId: (guardian: gapi.client.classroom.UserProfile) => guardian.id,
  },
  [fromAnnouncement.entityCollectionName]: {
    entityDispatcherOptions: {
      optimisticAdd: true,
      optimisticUpdate: true,
      optimisticSaveEntities: true,
    },
    selectId: (announcement: gapi.client.classroom.Announcement) =>
      announcement.id,
  },
  [fromStudentSubmission.entityCollectionName]: {
    entityDispatcherOptions: {
      optimisticAdd: true,
      optimisticUpdate: true,
      optimisticSaveEntities: true,
    },
    selectId: (studentSubmission: gapi.client.classroom.StudentSubmission) =>
      studentSubmission.id,
  },
  [fromTopic.entityCollectionName]: {
    entityDispatcherOptions: {
      optimisticAdd: true,
      optimisticUpdate: true,
      optimisticSaveEntities: true,
    },
    selectId: (topics: gapi.client.classroom.Topic) => topics.topicId,
  },
}

const pluralNames = {
  [fromAccountDomain.entityCollectionName]: fromAccountDomain.pluralizedEntityName,
  [fromAccount.entityCollectionName]: fromAccount.pluralizedEntityName,
  [fromSchoolCourses.entityCollectionName]: fromSchoolCourses.pluralizedEntityName,
  [fromAssignedCourses.entityCollectionName]: fromAssignedCourses.pluralizedEntityName,
  [fromScores.entityCollectionName]: fromScores.pluralizedEntityName,
  [fromCourse.entityCollectionName]: fromCourse.pluralizedEntityName,
  [fromStudent.entityCollectionName]: fromStudent.pluralizedEntityName,
  [fromTeacher.entityCollectionName]: fromTeacher.pluralizedEntityName,
  [fromCourseWork.entityCollectionName]: fromCourseWork.pluralizedEntityName,
  [fromUserProfile.entityCollectionName]: fromUserProfile.pluralizedEntityName,
  [fromGuardian.entityCollectionName]: fromGuardian.pluralizedEntityName,
  [fromAnnouncement.entityCollectionName]: fromAnnouncement.pluralizedEntityName,
  [fromStudentSubmission.entityCollectionName]: fromStudentSubmission.pluralizedEntityName,
  [fromTopic.entityCollectionName]: fromTopic.pluralizedEntityName,
};

export const entityConfig: EntityDataModuleConfig = {
  entityMetadata,
  pluralNames,
};

export function propsFilter(entities: User[], pattern: string) {
  return PropsFilterFnFactory<User>(['name', 'grade', 'primaryEmail'])(entities, pattern);
}
export function nameFilter(entities: { name: string }[], search: string) {
  return entities.filter((e) => -1 < e.name.indexOf(search));
}
