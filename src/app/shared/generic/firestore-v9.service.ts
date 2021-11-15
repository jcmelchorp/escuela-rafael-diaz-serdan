import { Inject } from '@angular/core';

import { from, Observable } from 'rxjs';
import { firebaseSerialize, IFirebase } from '@rds-shared/models/firebase.model';
import { QueryParams } from '@ngrx/data';
import { take, map, switchMap, tap } from 'rxjs/operators';
import { addDoc, collection, doc, Firestore, getDoc, orderBy, query, setDoc, deleteDoc, updateDoc } from 'firebase/firestore';
import { collectionData } from '@angular/fire/firestore';
export class FirestoreV9Service<T> implements IFirebase<T> {
  public readonly tCollection: string;
  public readonly colects: Observable<T[]>;
  constructor(
    @Inject('DEFAULT_COLLECTION_NAME') public collectionName: string,
    public readonly afs: Firestore,
  ) {

    this.tCollection = collectionName;
    if (!this.tCollection) {
      throw new Error('Firestore called with no collection name');
    }
    const asf_col = collection(this.afs, this.tCollection).withConverter({
      fromFirestore: snapshot => {
        const { ...T } = snapshot.data();
        const { id } = snapshot;
        const { hasPendingWrites } = snapshot.metadata;
        return { id, ...T, hasPendingWrites };
      },
      // TODO unused can we make implicit?
      toFirestore: (it: any) => it,
    });
    const queryCol = query(asf_col, orderBy('grade', 'asc'), orderBy('priority', 'asc'));
    this.colects = collectionData(queryCol);
    // this.fsCollection = this.afs.collection<T>(this.collection);
  }
  add(entity: T): Observable<T> {
    const refColl = collection(this.afs, this.tCollection);
    const refDoc = doc(refColl)
    console.log(refDoc.id)
    return from(setDoc(refDoc, firebaseSerialize({ ...entity, id: refDoc.id }))).pipe(map(x => firebaseSerialize({ ...entity, id: refDoc.id })));
  }
  update(id: string, entity: Partial<T>): Observable<T> {
    const refDoc = doc(this.afs, this.tCollection, id);
    return from(updateDoc(refDoc, firebaseSerialize(entity))).pipe(map(x => firebaseSerialize(entity)));
  }
  getById(id: string): Observable<T> {
    const refCollection = doc(this.afs, this.tCollection, id);
    return from(getDoc(refCollection)).pipe(map(x => x.data() as T));
  }
  delete(id: string): Observable<string> {
    const refCollection = doc(this.afs, `${this.tCollection}/${id}`);
    return from(deleteDoc(refCollection)).pipe(take(1), map(_ => id));
  }
  list(query?: QueryParams): Observable<T[]> {
    const refCollection = collection(this.afs, this.tCollection);
    return from(collectionData(refCollection, query)).pipe(map(x => x as T[]));
    /* const tCollection = collection(thisrefCollection.afs, this.collection);
    return from(collectionData(tCollection)).pipe(tap(x => console.log(x as T[])), map(x => x.map(data => data.data as T))); */
    /*     return this.fsCollection.valueChanges({ idField: 'id' });
     */
  }
  getWithQuery(query: QueryParams): Observable<T[]> {
    const refCollection = collection(this.afs, this.tCollection);
    return from(collectionData(refCollection, query)).pipe(map(x => x as T[]));
    /* return this.afs.collection<T>(this.collection, ref => ref.where(
      query['field'].toString(),
      query['operation'] as any,
      query['value'].toString()
    )).valueChanges({ idField: 'id' }) */
  }

  upsert(entity: T): Observable<any> {
    const tCollection = doc(collection(this.afs, this.tCollection));
    return from(setDoc(tCollection, entity, { merge: true }));
    /* const itemToUpsert = entity as any;
    if (itemToUpsert.id) {
      return this.update(itemToUpsert.id, itemToUpsert);
    } else {
      return this.add(itemToUpsert);
    } */
  }


  /* getMany(field?: string, predicate?: any, value?: any) : Observable<T> {
    const tCollection = collection(this.afs, this.collection);
    return from(collectionData(tCollection, {
      idField: 'id'
    })).pipe(map(x => x as T[]));
    / return this.afs.collection<T>(this.collection, ref => ref.where(
       field,
       predicate,
       value
     )).valueChanges(); */

}

