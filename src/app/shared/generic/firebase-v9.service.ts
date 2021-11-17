import { Inject } from '@angular/core';
import { from, Observable, of } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { Entity, firebaseSerialize, IFirebase } from '@rds-shared/models/firebase.model';
import { child, Database, query as query_db, onValue, push, ref, set, update, get, objectVal, orderByChild, equalTo } from '@angular/fire/database';
import { addDoc, collection, collectionData, deleteDoc, doc, Firestore, orderBy, query, setDoc, updateDoc } from '@angular/fire/firestore';
import { listVal } from 'rxfire/database';
export class FirebaseV9Service<T> implements IFirebase<T> {
  public readonly tCollection: string;
  public readonly colects: Observable<T[]>;
  constructor(
    @Inject('DEFAULT_COLLECTION_NAME') public collectionName: string,
    public readonly afs: Firestore,
    public readonly rtdb: Database,
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


  }
  add(entity: T): Observable<T> {
    let key: string;
    const updates = {};
    const refColl = collection(this.afs, this.tCollection);
    const refDoc = doc(refColl)
    entity['id'] ? key = entity['id'] : key = refDoc.id// key = push(child(ref(this.rtdb), this.tCollection)).key;
    updates[`/${this.tCollection}/` + key] = firebaseSerialize(entity);
    update(ref(this.rtdb), updates);
    console.log(refDoc.id)
    return from(setDoc(refDoc, firebaseSerialize({ ...entity, id: key }))).pipe(map(x => firebaseSerialize({ ...entity, id: key })));
  }
  update(id: string, entity: Partial<T>): Observable<T> {
    const updates = {};
    updates[`/${this.tCollection}/` + id] = firebaseSerialize(entity);
    update(ref(this.rtdb), updates);
    const refDoc = doc(this.afs, this.tCollection, id);
    return from(updateDoc(refDoc, firebaseSerialize(entity))).pipe(map(x => firebaseSerialize(entity)));
  }
  getById(id: string): Observable<T> {
    let entity: T;
    onValue(ref(this.rtdb, `/${this.tCollection}/${id}`), (snapshot) => {
      entity = snapshot.val();
    }, {
      onlyOnce: true
    });
    return of(entity)
  }
  delete(id: string): Observable<string> {
    const refCollection = doc(this.afs, `${this.tCollection}/${id}`);
    return from(deleteDoc(refCollection)).pipe(take(1), map(_ => id));
  }
  list(): Observable<T[]> {
    const dbref = ref(this.rtdb, this.tCollection);
    return listVal(dbref, { keyField: 'id' });
  }

  getWithQuery(field: string, value: any): Observable<T[]> {
    const dbref = ref(this.rtdb, this.tCollection);
    return listVal(dbref, { keyField: 'id' });
  }
}
