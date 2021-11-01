import {
  EntityMetadataMap,
  EntityDataModuleConfig,
  PropsFilterFnFactory,
} from '@ngrx/data';



export const entityMetadata: EntityMetadataMap = {

};

const pluralNames = {

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
