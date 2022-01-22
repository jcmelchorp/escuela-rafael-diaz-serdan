import {
  EntityMetadataMap,
  EntityDataModuleConfig,
  PropsFilterFnFactory,
} from '@ngrx/data';
import { User } from '@rds-auth/models/user.model';
import * as fromAccount from '@rds-store/accounts';
import * as fromAccountDomain from '@rds-store/accounts-domain';
import * as fromSchoolCourses from '@rds-store/school/school-courses';
import * as fromSchoolClassrooms from '@rds-store/school/school-classrooms';
import * as fromSchoolTeachers from '@rds-store/school/school-teachers';
import * as fromSchoolStudents from '@rds-store/school/school-students';
import * as fromSchoolCycles from '@rds-store/school/school-cycles';
import * as fromAnnouncement from '@rds-store/classroom/announcement';
import * as fromCourse from '@rds-store/classroom/course';
import * as fromCourseWork from '@rds-store/classroom/course-work';
import * as fromGuardian from '@rds-store/classroom/guardian';
import * as fromScores from '@rds-store/scores';
import * as fromStudent from '@rds-store/classroom/student';
import * as fromTeacher from '@rds-store/classroom/teacher';
import * as fromTopic from '@rds-store/classroom/topic';
import * as fromUserProfile from '@rds-store/classroom/user-profile';
import * as fromStudentSubmission from '@rds-store/classroom/student-submission';

import { AccountDomain } from '@rds-accounts/models/account-domain.model';
import { Score } from '@rds-profile/models/score.model';
import { SchoolCourse, SchoolCycle } from '@rds-school/models/school-course.model';
import { SchoolClassroom } from '../../school/models/school-course.model';


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
      optimisticDelete: false,
      optimisticUpsert: false,
    },
  },
  [fromAccount.entityCollectionName]: {
    sortComparer: (a: User, b: User) => a.name?.familyName.localeCompare(b.name?.familyName),
    filterFn: (entities: User[], { primaryEmail, name, role, grade, suspended }: Partial<User>) =>
      entities
        .filter((e) => (name && e.name && e.name.fullName
          ? e.name.fullName
            .toLocaleLowerCase()
            .includes(`${name.fullName!.toLocaleLowerCase()}`)
          : true))
        .filter((e) => (primaryEmail ? e.primaryEmail === primaryEmail : true))
        .filter((e) => (role ? e.role === role : true))
        .filter((e) => (grade ? e.grade === grade : true))
        .filter((e) => (suspended ? e.suspended === suspended : true)),
    selectId: (user: User) => user.id,
    entityDispatcherOptions: {
      optimisticAdd: false,
      optimisticUpdate: false,
      optimisticSaveEntities: false,
      optimisticDelete: false,
      optimisticUpsert: false,
    },
  },
  [fromSchoolCourses.entityCollectionName]: {
    sortComparer: (a: SchoolCourse, b: SchoolCourse) => (a.priority < b.priority ? -1 : 1),
    filterFn: (entities: SchoolCourse[], { id, name, grade, cycle, priority, courseType }: Partial<SchoolCourse>) =>
      entities
        .filter((e) => (id ? e.id === id : true))
        .filter((e) => (name ? e.name.includes(name) : true))
        .filter((e) => (courseType ? e.courseType === courseType : true))
        .filter((e) => (grade ? e.grade === grade : true))
        .filter((e) => (cycle ? e.cycle === cycle : true))
        .filter((e) => (priority ? e.priority === priority : true)),
    selectId: (SchoolCourse: SchoolCourse) => SchoolCourse.id,
    entityDispatcherOptions: {
      optimisticAdd: false,
      optimisticUpdate: false,
      optimisticSaveEntities: false,
      optimisticDelete: false,
      optimisticUpsert: false,
    },
  },
  [fromSchoolCycles.entityCollectionName]: {
    sortComparer: (a: SchoolCycle, b: SchoolCycle) => (a.label < b.label ? -1 : 1),
    filterFn: (entities: SchoolCycle[], { id, label, isCurrentDefault }: Partial<SchoolCycle>) =>
      entities
        .filter((e) => (id ? e.id.includes(id) : true))
        .filter((e) => (label ? e.label.includes(label) : true))
        .filter((e) => (isCurrentDefault ? e.isCurrentDefault === isCurrentDefault : true)),
    selectId: (SchoolCycle: SchoolCycle) => SchoolCycle.id,
    entityDispatcherOptions: {
      optimisticAdd: false,
      optimisticUpdate: false,
      optimisticSaveEntities: false,
      optimisticDelete: false,
      optimisticUpsert: false,
    },
  },
  [fromSchoolClassrooms.entityCollectionName]: {
    sortComparer: (a: SchoolClassroom, b: SchoolClassroom) => a.grade.localeCompare(b.grade),
    filterFn: (entities: SchoolClassroom[], { id, grade, cycle }: Partial<SchoolClassroom>) =>
      entities
        .filter((e) => (id ? e.id === id : true))
        .filter((e) => (grade ? e.grade === grade : true))
        .filter((e) => (cycle ? e.cycle === cycle : true)),
    selectId: (schoolClassroom: SchoolClassroom) => schoolClassroom.id,
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
      optimisticDelete: false,
      optimisticUpsert: false,
    },
    selectId: (score: Score) => score.id,
  },

  [fromCourse.entityCollectionName]: {
    entityDispatcherOptions: {
      optimisticAdd: false,
      optimisticUpdate: false,
      optimisticSaveEntities: false,
      optimisticDelete: false,
      optimisticUpsert: false,
    },
    selectId: (course: gapi.client.classroom.Course) => course.id,
  },
  [fromStudent.entityCollectionName]: {
    entityDispatcherOptions: {
      optimisticAdd: false,
      optimisticUpdate: false,
      optimisticSaveEntities: false,
      optimisticDelete: false,
      optimisticUpsert: false,
    },
    selectId: (student: gapi.client.classroom.Student) => student.userId,
  },
  [fromTeacher.entityCollectionName]: {
    entityDispatcherOptions: {
      optimisticAdd: false,
      optimisticUpdate: false,
      optimisticSaveEntities: false,
      optimisticDelete: false,
      optimisticUpsert: false,
    },
    selectId: (teacher: gapi.client.classroom.Teacher) => teacher.userId,
  },
  [fromCourseWork.entityCollectionName]: {
    entityDispatcherOptions: {
      optimisticAdd: false,
      optimisticUpdate: false,
      optimisticSaveEntities: false,
      optimisticDelete: false,
      optimisticUpsert: false,
    },
    selectId: (courseWork: gapi.client.classroom.CourseWork) => courseWork.id,
  },
  [fromUserProfile.entityCollectionName]: {
    entityDispatcherOptions: {
      optimisticAdd: false,
      optimisticUpdate: false,
      optimisticSaveEntities: false,
      optimisticDelete: false,
      optimisticUpsert: false,
    },
    selectId: (profile: gapi.client.classroom.UserProfile) => profile.id,
  },
  [fromGuardian.entityCollectionName]: {
    entityDispatcherOptions: {
      optimisticAdd: false,
      optimisticUpdate: false,
      optimisticSaveEntities: false,
      optimisticDelete: false,
      optimisticUpsert: false,
    },
    selectId: (guardian: gapi.client.classroom.UserProfile) => guardian.id,
  },
  [fromAnnouncement.entityCollectionName]: {
    entityDispatcherOptions: {
      optimisticAdd: false,
      optimisticUpdate: false,
      optimisticSaveEntities: false,
      optimisticDelete: false,
      optimisticUpsert: false,
    },
    selectId: (announcement: gapi.client.classroom.Announcement) =>
      announcement.id,
  },
  [fromStudentSubmission.entityCollectionName]: {
    entityDispatcherOptions: {
      optimisticAdd: false,
      optimisticUpdate: false,
      optimisticSaveEntities: false,
      optimisticDelete: false,
      optimisticUpsert: false,
    },
    selectId: (studentSubmission: gapi.client.classroom.StudentSubmission) =>
      studentSubmission.id,
  },
  [fromTopic.entityCollectionName]: {
    entityDispatcherOptions: {
      optimisticAdd: false,
      optimisticUpdate: false,
      optimisticSaveEntities: false,
      optimisticDelete: false,
      optimisticUpsert: false,
    },
    selectId: (topics: gapi.client.classroom.Topic) => topics.topicId,
  },
}

const pluralNames = {
  [fromAccountDomain.entityCollectionName]: fromAccountDomain.pluralizedEntityName,
  [fromAccount.entityCollectionName]: fromAccount.pluralizedEntityName,
  [fromSchoolCourses.entityCollectionName]: fromSchoolCourses.pluralizedEntityName,
  [fromSchoolCycles.entityCollectionName]: fromSchoolCycles.pluralizedEntityName,
  [fromSchoolClassrooms.entityCollectionName]: fromSchoolClassrooms.pluralizedEntityName,
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
/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
export function compare(a: string | number, b: string | number): number {
  return (a < b ? -1 : 1);
}
