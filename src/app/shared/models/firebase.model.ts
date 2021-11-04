import { QueryParams } from "@ngrx/data";
import { Observable } from "rxjs";

/**
 * Base Entity interface that our models will extend
 * */
export interface Entity {
  id?: string; // Optional for new Entities
}
export interface IFirebase<T> {
  add(entity: T, id?: string): Observable<T>;
  update(id: string, entity: Partial<T>): Observable<T>;
  getById(id: string): Observable<T>;
  delete(id: string): Observable<string>;
  list(): Observable<T[]>;
  getWithQuery(query: QueryParams): Observable<T[]>;
}
/**
 * function that will turn our JS Objects into an Object that Firestore can work with
 * */
export function firebaseSerialize<T>(object: T) {
  return JSON.parse(JSON.stringify(object));
}
