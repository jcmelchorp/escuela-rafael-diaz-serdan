import { Inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { map, take } from 'rxjs/operators';
import { QueryParams } from '@ngrx/data';
import { Entity, firebaseSerialize, IFirebase } from '@rds-shared/models/firebase.model';
export class FirebaseService<T extends Entity> implements IFirebase<T> {
  private collection: string;
  private fsCollection: AngularFirestoreCollection<T>;
  private rtdbList: AngularFireList<T>;
  constructor(
    @Inject('DEFAULT_COLLECTION_NAME') public collectionName: string,
    public readonly afs: AngularFirestore,
    public readonly afdb: AngularFireDatabase
  ) {
    if (!collectionName) {
      throw new Error('Firestore called with no collection name');
    }
    this.collection = collectionName;
    this.rtdbList = this.afdb.list<T>(this.collection);
    this.fsCollection = this.afs.collection<T>(this.collection);
  }
  add(entity: T, id?: string): Observable<T> {
    if (id) {
      this.fsCollection.doc(id).update(firebaseSerialize(entity)).then(_ =>
        this.rtdbList.update(id, firebaseSerialize(entity))
      );
    } else {
      this.fsCollection.add(firebaseSerialize(entity)).then(_ =>
        this.rtdbList.push(firebaseSerialize(entity))
      );
    }
    return this.getById(id);
  }
  update(id: string, entity: Partial<T>): Observable<T> {
    this.fsCollection.doc<T>(id).update(firebaseSerialize(entity));
    this.rtdbList.update(id, firebaseSerialize(entity));
    return of({ id, ...entity } as T)
  }
  getById(id: string): Observable<T> {
    return this.fsCollection
      .doc<T>(id).snapshotChanges().pipe(
        // We want to map the document into a Typed JS Object
        map((doc) => {
          // Only if the entity exists should we build an object out of it
          if (doc.payload.exists) {
            const data = doc.payload.data() as T;
            const payloadId = doc.payload.id;
            return { id: payloadId, ...data };
          }
        })
      );
  }
  delete(id: string): Observable<string> {
    this.fsCollection.doc<T>(id).delete();
    this.rtdbList.remove(id);
    return of(id)
  }
  list(): Observable<T[]> {
    return this.fsCollection.valueChanges({ idField: 'id' });
  }

  getWithQuery(query: QueryParams): Observable<T[]> {
    return this.afs.collection<T>(this.collection, ref => ref.where(
      query['field'].toString(),
      query['operation'] as any,
      query['value'].toString()
    )).snapshotChanges().pipe(
      // Again we want to build a Typed JS Object from the Document
      map((changes) => {
        return changes.map((a) => {
          const data = a.payload.doc.data() as T;
          data.id = a.payload.doc.id;
          return data;
        });
      })
    );
  }
}
