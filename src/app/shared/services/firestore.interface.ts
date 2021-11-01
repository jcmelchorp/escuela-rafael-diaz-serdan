import {
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';

import { Observable } from 'rxjs';

export interface IFirestoreService<T> {
  create(item: T): Observable<any>;
  update(id: string, item: T): Observable<void>;
  getById(id: string): any; // TODO: Find coorect type
  delete(id: string): Observable<void>;
  getList(): AngularFirestoreCollection<T>;
}
