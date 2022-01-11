import { Inject } from '@angular/core';
import { from, Observable, of } from 'rxjs';
import { firebaseSerialize, IFirebase } from '@rds-shared/models/firebase.model';
import { QueryParams } from '@ngrx/data';
import { take, map, mergeMap } from 'rxjs/operators';
import { DocumentData, CollectionReference, collection, collectionData, deleteDoc, doc, Firestore, getDoc, query, setDoc, updateDoc, where } from '@angular/fire/firestore';

export class FirestoreV9Service<T> implements IFirebase<T> {
  public readonly tCollection: string;
  public colRef: CollectionReference;
  constructor(
    @Inject('DEFAULT_COLLECTION_NAME') public collectionName: string,
    public afs: Firestore,
  ) {
    if (!collectionName) {
      throw new Error('Firestore called with no collection name');
    } else {

    }
    this.tCollection = collectionName;
    this.colRef = collection(this.afs, this.collectionName);
  }
  add(entity: T, id?: string): Promise<T> {
    let key: string = '';
    const refColl = collection(this.afs, this.tCollection);
    entity['id'] ? (key = entity['id']) : (key = null);
    if (key !== null) {
      console.log('Entity with Id: ' + key + ' added');
      const refDoc = doc(refColl, key);
      return setDoc(refDoc, firebaseSerialize({ ...entity, id: key }))
        .then(() => { return { ...entity, id: key } as T });
    } else {
      console.log('Entity with no Id');
      const refDoc = doc(refColl);
      return setDoc(refDoc, firebaseSerialize({ ...entity, id: refDoc.id }))
        .then(() => { return { ...entity, id: refDoc.id } as T });
    }
  }



  update(id: string, entity: T): Observable<T> {
    const refDoc = doc(this.afs, this.tCollection, id);
    return from(updateDoc(refDoc, firebaseSerialize(entity))).pipe(map(_ => entity));
  }
  getById(id: string): Observable<T> {
    const refDoc = doc(this.afs, this.tCollection, id);
    return from(getDoc(refDoc)).pipe(map(x => x.data() as T));
  }
  delete(id: string): Observable<string> {
    const refDoc = doc(this.afs, this.tCollection, id);
    return from(deleteDoc(refDoc)).pipe(map(_ => id));
  }
  list(): Observable<T[]> {
    const refCollection = collection(this.afs, this.tCollection);
    return collectionData(refCollection, { idField: 'id' }).pipe(take(1), map(x => x as T[]));
    /* const tCollection = collection(thisrefCollection.afs, this.collection);
    return from(collectionData(tCollection)).pipe(tap(x => console.log(x as T[])), map(x => x.map(data => data.data as T))); */
    /*     return this.fsCollection.valueChanges({ idField: 'id' });
     */
  }


  getWithQuery(queryParams: QueryParams): Observable<T[]> {
    const queryWithParams = query(collection(this.afs, this.tCollection), where(Object.keys(queryParams).pop(), '==', Object.values(queryParams).pop()))
    return collectionData(queryWithParams, { idField: 'id' }).pipe(take(1), map(x => x as T[]));

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


