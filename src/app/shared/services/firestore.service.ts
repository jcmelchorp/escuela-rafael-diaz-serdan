import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Inject, Injectable } from '@angular/core';

import { from, Observable } from 'rxjs';

import { IFirestoreService } from './firestore.interface';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService<T> implements IFirestoreService<T> {
  collection: string;

  constructor(
    @Inject('DEFAULT_COLLECTION_NAME') public collectionName: string,
    public db: AngularFirestore
  ) {
    if (!collectionName) {
      throw new Error('Firestore called with no collection name');
    }
    this.collection = collectionName;
  }

  upsert(item: T): Observable<any> {
    const itemToUpsert = item as any;
    if (itemToUpsert.id) {
      return this.update(itemToUpsert.id, itemToUpsert);
    } else {
      return this.create(itemToUpsert);
    }
  }

  create(item: T): Observable<any> {
    const itemToAdd = JSON.parse(JSON.stringify(item));
    itemToAdd.id = this.db.createId();
    console.log('itemToCreate', itemToAdd);
    const ref = this.db.doc<T>(`${this.collection}/${itemToAdd.id}`);
    return from(ref.set(itemToAdd));
  }

  update(id: string, item: Partial<T>): any {
    const itemToUpdate = this.db.doc<T>(`${this.collection}/${id}`);
    return from(itemToUpdate.update(item));
  }

  getList(): AngularFirestoreCollection<T> {
    return this.db.collection(`${this.collection}`);
  }

  getById(id: string) {
    return this.db.collection(`${this.collection}`).doc(id).valueChanges();
  }

  get(field?: string, predicate?: any, value?: any) {
    return this.db
      .collection(`${this.collection}`, (ref) =>
        ref.where(field, predicate, value)
      )
      .valueChanges();
  }

  delete(id: string): Observable<void> {
    return from(this.db.doc(`${this.collection}/${id}`).delete());
  }
}
