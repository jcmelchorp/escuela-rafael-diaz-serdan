import { Observable } from "rxjs";

export interface IFirebase<T> {
  add(entity: T): Observable<T>;
  update(id: string, entity: Partial<T>): Observable<T>;
  getById(id: string): Observable<T>;
  delete(id: string): Observable<string>;
  list(): Observable<T[]>;

}
