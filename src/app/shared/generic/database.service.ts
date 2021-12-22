import { Inject } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { QueryParams } from '@ngrx/data';
import { Entity, firebaseSerialize, IFirebase } from '@rds-shared/models/firebase.model';
import { from, Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

export class DatabaseService<T extends Entity> implements IFirebase<T> {
  private dbRef: AngularFireList<T>;
  private collection: string;
  constructor(
    @Inject('DEFAULT_COLLECTION_NAME') public collectionName: string,
    public readonly afdb: AngularFireDatabase
  ) {
    if (!collectionName) {
      throw new Error('Firestore called with no collection name');
    }
    this.collection = collectionName;
    this.dbRef = this.afdb.list<T>(this.collection);
  }
  add(entity: T, id?: string): Observable<T> {
    if (id) {
      return from(this.dbRef
        .update(id, firebaseSerialize(entity)))
        .pipe(take(1), map(_ => { return { id, ...entity } as T }));
    } else {
      return from(this.dbRef
        .push(firebaseSerialize(entity)))
        .pipe(take(1), map(_ => { return { id, ...entity } as T }));
    }
  }
  update(id: string, entity: Partial<T>): Observable<T> {
    return from(this.dbRef
      .update(id, firebaseSerialize(entity)))
      .pipe(take(1), map(_ => { return { id, ...entity } as T }));
  }
  getById(id: string): Observable<T> {
    return this.afdb.object<T>(`${this.collection}/${id}`)
      .valueChanges()
      .pipe(take(1));
  }
  delete(id: string): Observable<string> {
    return from(this.dbRef
      .remove(id))
      .pipe(take(1), map(_ => id));
  }
  list(): Observable<T[]> {
    return this.dbRef
      .valueChanges()
      .pipe(take(1));
  }

  getWithQuery(query: QueryParams): Observable<T[]> {
    return this.afdb.list<T>(this.collection, ref => ref
      .child(Object.keys(query).pop())
      .equalTo(Object.values(query)[0].toString())
      .orderByValue())
      .valueChanges()
      .pipe(take(1));
  }
}
