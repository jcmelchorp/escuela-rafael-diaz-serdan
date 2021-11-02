import {
  EntityMetadataMap,
  EntityDataModuleConfig,
  PropsFilterFnFactory,
} from '@ngrx/data';
import { User } from '@rds-auth/models/user.model';
import * as fromAccount from '@rds-store/accounts';
import * as fromAccountDomain from '@rds-store/accounts-domain';


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
