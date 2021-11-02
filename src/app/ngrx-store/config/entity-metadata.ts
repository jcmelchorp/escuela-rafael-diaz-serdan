import {
  EntityMetadataMap,
  EntityDataModuleConfig,
  PropsFilterFnFactory,
} from '@ngrx/data';
import { User } from '@rds-auth/models/user.model';
import * as fromAccount from '@rds-store/accounts';
import * as fromAccountDomain from '@rds-store/accounts-domain';
import * as fromAnnouncement from '@rds-store/classroom/announcement';
import * as fromCourse from '@rds-store/classroom/course';
import * as fromCourseWork from '@rds-store/classroom/course-work';
import * as fromGuardian from '@rds-store/classroom/guardian';
import * as fromStudent from '@rds-store/classroom/student';
import * as fromTeacher from '@rds-store/classroom/teacher';
import * as fromTopic from '@rds-store/classroom/topic';
import * as fromUserProfile from '@rds-store/classroom/user-profile';
//import * as fromGroup from '@rds-admin/state/group';
import * as fromStudentSubmission from '@rds-store/classroom/student-submission';

export const entityMetadata: EntityMetadataMap = {
  [fromAccountDomain.entityCollectionName]: {
    filterFn: (entities: User[], { name, grade, role }: Partial<User>) =>
      entities
        .filter((e) =>
          name && e.name && e.name.fullName
            ? e.name.fullName
              .toLocaleLowerCase()
              .includes(`${name.fullName!.toLocaleLowerCase()}`)
            : true
        )
        .filter((e) => (grade ? e.grade === grade : true))
        .filter((e) => (role ? e.role === role : true)),
    entityDispatcherOptions: {
      optimisticAdd: false,
      optimisticUpdate: false,
      optimisticSaveEntities: false,
    },
  },
  [fromAccount.entityCollectionName]: {
    filterFn: (entities: User[], { name, grade, role }: Partial<User>) =>
      entities
        .filter((e) =>
          name && e.name && e.name.fullName
            ? e.name.fullName
              .toLocaleLowerCase()
              .includes(name.fullName!.toLocaleLowerCase())
            : true
        )
        .filter((e) => (grade ? e.grade === grade : true))
        .filter((e) => (role ? e.role === role : true)),
    selectId: (user: User) => user.id,
    entityDispatcherOptions: {
      optimisticAdd: false,
      optimisticUpdate: false,
      optimisticSaveEntities: false,
    },
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
  /*
    [fromGroup.entityCollectionName]: {
      entityDispatcherOptions: {
        optimisticAdd: true,
        optimisticUpdate: true,
        optimisticSaveEntities: true,
      },
    }, */
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
};

const pluralNames = {
  [fromAccountDomain.entityCollectionName]: fromAccountDomain.pluralizedEntityName,
  [fromAccount.entityCollectionName]: fromAccount.pluralizedEntityName,
};

export const entityConfig: EntityDataModuleConfig = {
  entityMetadata,
  pluralNames,
};

/* export function nameGradeFilter(entities: Course[], pattern: string) {
  return PropsFilterFnFactory<Course>(['name', 'grade'])(entities, pattern);
} */
export function nameFilter(entities: { name: string }[], search: string) {
  return entities.filter((e) => -1 < e.name.indexOf(search));
}
