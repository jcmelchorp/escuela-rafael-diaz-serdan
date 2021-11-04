import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Inject } from '@angular/core';

import { from, Observable } from 'rxjs';
import { firebaseSerialize, IFirebase } from '@rds-shared/models/firebase.model';
import { QueryParams } from '@ngrx/data';
import { take, map } from 'rxjs/operators';
export class FirestoreService<T> implements IFirebase<T> {
  private collection: string;
  private fsCollection: AngularFirestoreCollection<T>;
  constructor(
    @Inject('DEFAULT_COLLECTION_NAME') public collectionName: string,
    public readonly afs: AngularFirestore,
  ) {
    if (!collectionName) {
      throw new Error('Firestore called with no collection name');
    }
    this.collection = collectionName;
    this.fsCollection = this.afs.collection<T>(this.collection);
  }
  add(entity: T, id?: string): Observable<T> {
    if (id) {
      return from(this.fsCollection.doc(id).update(firebaseSerialize(entity)))
        .pipe(take(1), map(_ => { return { id, ...entity } as T }));
    } else {
      return from(this.fsCollection.add(firebaseSerialize(entity)))
        .pipe(take(1), map(_ => { return { id, ...entity } as T }));
    }
  }
  update(id: string, entity: Partial<T>): Observable<T> {
    return from(this.fsCollection.doc<T>(id).update(firebaseSerialize(entity)))
      .pipe(take(1), map(_ => { return { id, ...entity as T } }));
  }
  getById(id: string): Observable<T> {
    return this.fsCollection
      .doc<T>(id).valueChanges({ idField: 'id' })
      .pipe(take(1));
  }
  delete(id: string): Observable<string> {
    return from(this.fsCollection.doc<T>(id).delete())
      .pipe(take(1), map(_ => id));
  }
  list(): Observable<T[]> {
    return this.fsCollection.valueChanges({ idField: 'id' }).pipe(take(1));
  }
  getWithQuery(query: QueryParams): Observable<T[]> {
    return this.afs.collection<T>(this.collection, ref => ref.where(
      query['field'].toString(),
      query['operation'] as any,
      query['value'].toString()
    )).valueChanges()
      .pipe(take(1));
  }

  upsert(entity: T): Observable<any> {
    const itemToUpsert = entity as any;
    if (itemToUpsert.id) {
      return this.update(itemToUpsert.id, itemToUpsert);
    } else {
      return this.add(itemToUpsert);
    }
  }


  getMany(field?: string, predicate?: any, value?: any) {
    return this.afs.collection<T>(this.collection, ref => ref.where(
      field,
      predicate,
      value
    )).valueChanges();
  }
}

